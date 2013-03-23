RSpec::Matchers.define :be_json_error do |expected|
  match do |actual|
    begin
      JSON.parse(actual)['isSuccess'] == false
    rescue JSON::ParserError
      false
    end
  end
end
