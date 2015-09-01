var testUrl = 'http://skeleton.local/assets/styleguide/section-4.html';
var nodeTarget = '#kssref-4-1';
var nodeName = 'basic-buttons';

casper.thenOpen(testUrl)
.then(function() {
    this.viewport(1200, 800);
    phantomcss.screenshot(nodeTarget, nodeName + '--large');

}).then(function() {

  this.viewport(320, 568);
  phantomcss.screenshot(nodeTarget, nodeName + '--small');

});
