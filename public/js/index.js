
$(function () {
  getList($('#original'));
  groupClass()
})

var classList = []
var classGroup;
function getList (item) {
  var children = $(item).children()
  for (var i=0; i<children.length; i++) {
    var child = children[i];
    var className = child.classList[0]
    if (className) classList.push(className)
    getList(child)
  }
}

function groupClass() {
  classGroup = _.groupBy(classList)
  scoreList = []
  for (var key in classGroup) {
    var s = classGroup[key].length;
    var p = $('.' + key).parent().length
    var c = $('.' + key).children().length
    var score = c - p
    var hash = { name: key, score: score, s: s, c: c, p: p }
    scoreList.push(hash)
  }
  topClass = _.sortBy(scoreList, 'score').reverse()[0];
  var item = $('.' + topClass.name)[0]

  json = createStructure(item);
}

function createStructure (item) {
  var info = {
    tag: item.tagName.toLowerCase(),
    id: item.id,
    classes: item.classList,
    name: item.className,
    children: []
  }
  for (var i=0; i<item.children.length; i++) {
    var child = item.children[i];
    var childInfo = createStructure(child)
    info.children.push(childInfo)
  }
  return info
}




// var originalHTML = $('#original').html();
// $('#hide').html(originalHTML);

// $('#generate').html();

var hide = $('#hide');
// var users = $('#users', target);
// var user = $('.user', users)[0];
// $('.name', user).text(\"{user.name}\");
// $('.about', user).text(\"{user.about}\");

// $('#generate')
// target.html('');

function createHTML (element) {
  var children = $(element).children();
  while (children.length == 1) {
    children = children.children();
  }
  children.not(':first').remove();
  var el = $(children[0]);
  var name = el.attr('class');
  var items = el.children();
  for (var i =0; i<items.length; i++) {
    var item = $(items[i]);
    var text = name + '.' + item.attr('class');
    item.text(text);
  }
}


var target;
$( function () {
  target = $('#original');

  // var originalHTML = $('#original').html();
  // $('#hide').html(originalHTML);

  $('#generate').html();

  var hide = $('#hide');
  // var users = $('#users', target);
  // var user = $('.user', users)[0];
  // $('.name', user).text(\"{user.name}\");
  // $('.about', user).text(\"{user.about}\");

  // var target = _.clone($('#hide'));
  // $('#generate')
  // target.html('');

  function createHTML (element) {
    var children = $(element).children();
    while (children.length > 1) {
      children = children.children();
    }
    children.not(':first').remove();

    /*
    for (var i=0; i<children.length; i++) {
      if (i>0)
      var element = children[i];
      element = $(element);
      var cs = element.children();
      if (cs.length > 0) {
        createHTML(cs[0]);
      } else {
        var text = element.attr('class');
        console.log(text);
        element.text(text);
      }
    }
    */
  }



  var html = "<div id=\"users\"><div class=\"user\"><h1 class=\"name\">{user.name}</h1><p class=\"about\">{user.about}</p></div>";
  $.ajax({
    url: '/send',
    type: 'POST',
    dataType: 'json',
    data: { html: html },
  })
  .done(function(data) {
    console.log(data);
  })


})