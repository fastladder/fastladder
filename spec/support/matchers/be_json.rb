RSpec::Matchers.define :be_json do |expected|
  match do |actual|
    begin
      JSON.parse(actual)
      true
    rescue JSON::ParserError
      false
    end
  end
end
