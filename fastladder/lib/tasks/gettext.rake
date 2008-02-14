namespace :gettext do
  desc 'Update pot/po files.'
  task :update_po do
    require 'gettext/utils'
    GetText.update_pofiles('fastladder', Dir.glob('{app,config,components,lib}/**/*.{rb,erb,rhtml,rjs}'), 'fastladder 0.0.2')
  end

  desc 'Create mo files.'
  task :make_mo do
    require 'gettext/utils'
    GetText.create_mofiles(true, 'po', 'locale')
  end
end
