class Settings < SettingsCabinet::Base
  using SettingsCabinet::DSL

  source "#{Rails.root}/config/application.yml"
  namespace Rails.env
end
