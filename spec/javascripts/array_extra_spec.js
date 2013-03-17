//= require lib/utils/array_extra
describe("Array", function(){
  describe("#map", function(){
    it("return function applied array", function() {
      var arr = [1,2,3];
      var twice = function(i){return i*2;};
      expect(arr.map(twice)).deep.equal([2,4,6]);
    });
  });
});
