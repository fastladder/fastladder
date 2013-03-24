#= require lib/utils/array_extra
#= require lib/utils/common
#= require lib/utils/DateTime
describe "DateTime", ->
  describe "#ymd", ->
    it "returns a formatted date", ->
      datetime = new DateTime(new Date(2013, 4, 5, 6, 7, 8).getTime())
      expect(datetime.ymd()).equal "2013/05/05"

  describe "#hms", ->
    it "returns a formatted time", ->
      datetime = new DateTime(new Date(2013, 4, 5, 6, 7, 8).getTime());
      expect(datetime.hms()).equal "06:07:08"

  describe "#ymd_jp", ->
    it "returns a formatted date in Japanese", ->
      datetime = new DateTime(new Date(2013, 4, 5, 6, 7, 8).getTime())
      expect(datetime.ymd_jp()).equal "2013年05月05日"

