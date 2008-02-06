#include <stdlib.h>
#include <string.h>
#include <FreeImage.h>
#include "ruby.h"

static int ico2png(char **output, size_t *output_length, const char *input, size_t input_length, int width, int height)
{
	FIMEMORY *mem_src = NULL;
	FREE_IMAGE_FORMAT fif = 0;
	int flags = 0;
	FIBITMAP *icon = NULL;
	FIBITMAP *resized = NULL;
	FIMEMORY *mem_dest = NULL;
	char *mem_dest_ptr = NULL;

	mem_src = FreeImage_OpenMemory((BYTE *)input, (DWORD)input_length);
	fif = FreeImage_GetFileTypeFromMemory(mem_src, 0);
	if (fif == FIF_UNKNOWN) {
		fif = FIF_ICO;
	}
	switch (fif) {
	case FIF_ICO:
		flags = ICO_MAKEALPHA;
		break;
	case FIF_JPEG:
		flags = JPEG_ACCURATE;
		break;
	}
	icon = FreeImage_LoadFromMemory(fif, mem_src, flags);
	FreeImage_CloseMemory(mem_src);
	if (icon == NULL) {
		return 0;
	}
	resized = FreeImage_Rescale(icon, width, height, FILTER_CATMULLROM);
	FreeImage_Unload(icon);
	if (resized == NULL) {
		return 0;
	}
	mem_dest = FreeImage_OpenMemory(NULL, 0);
	if (!FreeImage_SaveToMemory(FIF_PNG, resized, mem_dest, 0)) {
		FreeImage_CloseMemory(mem_dest);
		FreeImage_Unload(resized);
		return 0;
	}
	FreeImage_Unload(resized);
	if (!FreeImage_AcquireMemory(mem_dest, (BYTE **)&mem_dest_ptr, (DWORD *)output_length)) {
		FreeImage_CloseMemory(mem_dest);
		return 0;
	}
	if ((*output = (char *)malloc(*output_length)) == NULL) {
		FreeImage_CloseMemory(mem_dest);
		return 0;
	}
	memcpy((void *)*output, (void *)mem_dest_ptr, *output_length);
	FreeImage_CloseMemory(mem_dest);
	return 1;
}

static VALUE ruby_ico2png(VALUE self, VALUE ico)
{
	char *png;
	size_t length;
	VALUE result;

	StringValue(ico);
	if (RSTRING(ico)->ptr == NULL || RSTRING(ico)->len == 0) {
		return Qnil;
	}
	if (!ico2png(&png, &length, RSTRING(ico)->ptr, RSTRING(ico)->len, 16, 16)) {
		return Qnil;
	}
	result = rb_str_new(png, length);
	free(png);
	return result;
}

void Init_image_utils(void)
{
	VALUE module = rb_define_module("ImageUtils");
	rb_define_method(module, "ico2png", ruby_ico2png, 1);
}
