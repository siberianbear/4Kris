function calculateCounter() {
  // Erase counters if are already rendered (on window resize).
  var $counterCanvas = $('.counter__pie canvas');

  if ($counterCanvas.length) {
    $counterCanvas.remove();
  }

  var id = '#counter-0',
      wrapper = document.querySelector(id),
      element = document.querySelector(id + ' .counter__pie'),
      wrapperSize = wrapper.offsetWidth;

  // Change widget version from floating to full width if neccesary.
  if (wrapperSize <= 120) {
    $(id).addClass('is-big');
    $(id).find('.counter__left.counter__left--zero').addClass('hidden');
  }
  else {
    $(id).removeClass('is-big');
    $(id).find('.counter__left.counter__left--zero').removeClass('hidden');
  }

  var elementSize = element.offsetWidth;

  new EasyPieChart(element, {
    scaleColor: false,
    trackColor: '#eee',
    trackWidth: 1,
    barColor: '#669900',
    lineWidth: 6,
    lineCap: 'butt',
    size: elementSize
  });
}

calculateCounter();

$(window).resize(function() {
  calculateCounter();
});
