#!/usr/bin/env ruby

require "mkmf"

have_header "FreeImage.h"
have_library "freeimage"
create_makefile "image_utils"
