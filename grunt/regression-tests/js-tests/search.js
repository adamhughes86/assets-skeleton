var testUrl = 'http://skeleton.local/assets/styleguide/section-8.html';
var nodeTarget = '.search__fieldset';
var nodeName = 'search';

casper.thenOpen(testUrl)
.then(function() {
    this.viewport(1200, 800);
    phantomcss.screenshot(nodeTarget, nodeName + '--large');

}).then(function() {

  this.viewport(320, 568);
  phantomcss.screenshot(nodeTarget, nodeName + '--small');

});
