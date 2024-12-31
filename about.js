window.addEventListener('load', function() {
    var headerHeight = document.getElementById('header').offsetHeight;
    document.getElementById('content').style.marginTop = headerHeight + 'px';
  });
