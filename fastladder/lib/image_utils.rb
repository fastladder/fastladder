require "dl/import"
require "dl/struct"

module ImageUtils
  module FreeImage
    extend DL::Importable
    FIBITMAP = struct ["void* data"]
    FIMEMORY = struct ["void* data"]
    typealias "FREE_IMAGE_FORMAT", "int"
    typealias "FREE_IMAGE_FILTER", "int"
    begin
      dlload "libfreeimage.so"
    rescue => ex
      dlload "lib/libfreeimage-3.10.0.dylib"
    end
    extern "FIMEMORY* FreeImage_OpenMemory(BYTE*, DWORD)"
    extern "void FreeImage_CloseMemory(FIMEMORY*)"
    extern "BOOL FreeImage_AcquireMemory(FIMEMORY*, BYTE**, DWORD*)"
    extern "FIBITMAP* FreeImage_LoadFromMemory(FREE_IMAGE_FORMAT, FIMEMORY*, int)"
    extern "BOOL FreeImage_SaveToMemory(FREE_IMAGE_FORMAT, FIBITMAP*, FIMEMORY*, int)"
    extern "FREE_IMAGE_FORMAT FreeImage_GetFileTypeFromMemory(FIMEMORY*, int)"
    extern "FIBITMAP* FreeImage_Rescale(FIBITMAP*, int, int, FREE_IMAGE_FILTER)"
    extern "void FreeImage_Unload(FIBITMAP*)"
    FIF_UNKNOWN = -1
    FIF_BMP = 0
    FIF_ICO = 1
    FIF_JPEG = 2
    FIF_PNG = 13
    FIF_GIF = 25
    ICO_MAKEALPHA = 1
    JPEG_ACCURATE = 2
    FILTER_CATMULLROM = 4
  end
  module_function
  
  FILE_FORMATS = {
    "bmp" => FreeImage::FIF_BMP,
    "icon" => FreeImage::FIF_ICO,
    "ico" => FreeImage::FIF_ICO,
    "jpeg" => FreeImage::FIF_JPEG,
    "jpg" => FreeImage::FIF_JPEG,
    "png" => FreeImage::FIF_PNG,
    "gif" => FreeImage::FIF_GIF,
  }
  def file_format(str)
    FILE_FORMATS[str.to_s.downcase]
  end

  def convert(src, options = {})
    src_format = options[:src_format] ? file_format(options[:src_format]) : nil
    unless dest_format = (options[:dest_format] ? file_format(options[:dest_format]) : src_format)
      return nil
    end
    width = options[:width] ? options[:width].to_i : nil
    height = options[:height] ? options[:height].to_i : nil

    unless mem_src = FreeImage::freeImage_OpenMemory(src, src.length)
      return nil
    end
    fif = FreeImage::freeImage_GetFileTypeFromMemory(mem_src, 0);
    if fif == FreeImage::FIF_UNKNOWN
      return nil if src_format.nil?
      fif = src_format
    end
    flags = 0
    case (fif)
    when FreeImage::FIF_ICO
      flags |= FreeImage::ICO_MAKEALPHA
    when FreeImage::FIF_JPEG
      flags |= FreeImage::JPEG_ACCURATE
    end
    bmp = FreeImage::freeImage_LoadFromMemory(fif, mem_src, flags)
    FreeImage::freeImage_CloseMemory(mem_src)
    if bmp.nil?
      return nil
    end
    if width and height
      resized_bmp = FreeImage::freeImage_Rescale(bmp, width, height, FreeImage::FILTER_CATMULLROM);
      FreeImage::freeImage_Unload(bmp)
      unless bmp = resized_bmp
        return nil
      end
    end
    mem_dest = FreeImage::freeImage_OpenMemory(nil, 0)
    unless FreeImage::freeImage_SaveToMemory(dest_format, bmp, mem_dest, 0)
      FreeImage::freeImage_CloseMemory(mem_dest)
      FreeImage::freeImage_Unload(bmp)
      return nil
    end
    FreeImage::freeImage_Unload(bmp)
    mem_dest_ptr = DL::malloc(DL::sizeof("p"))
    mem_dest_len = DL::malloc(DL::sizeof("i"))
    unless FreeImage::freeImage_AcquireMemory(mem_dest, mem_dest_ptr, mem_dest_len)
      FreeImage::freeImage_CloseMemory(mem_dest)
      return nil
    end
    length = mem_dest_len.to_a("I", 1)[0]
    dest = DL::PtrData::new(mem_dest_ptr.to_a("P", 1)[0]).to_s(length)
    #GC.start
    dest
  end

  def self.ico2png(src)
    convert(src, :src_format => :ico, :dest_format => :png, :width => 16, :height => 16)
  end
end

if __FILE__ == $0
  require "test/unit"
  class ImageUtilsTest < Test::Unit::TestCase # :nodoc:
    def test_ico2png
      png = ImageUtils::ico2png(File.read("favicon.ico"))
      assert_equal(png, File.read("favicon.png"))
    end
  end
end
