shared_context :use_stub_opml do
  before {
    allow(Fastladder).to receive(:simple_fetch).and_return(read_stub_file("opml"))
  }

  private

  def read_stub_file(filename)
    stub_root_dir = File.expand_path(File.dirname(__FILE__) + "/../../spec/stubs")
    open("#{stub_root_dir}/#{filename}").read
  end
end

