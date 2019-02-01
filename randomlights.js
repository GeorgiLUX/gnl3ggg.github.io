"use strict";

TweenLite.defaultEase = Linear.easeNone;

var cx = 200;
var cy = 200;

var svgns = "http://www.w3.org/2000/svg";
var root = document.querySelector("svg");
var twoPi = Math.PI * 2;
var ease = 0.35;
var total = 25;

var colors = ["#000000", "#ffffff", "#ffffff", "#ffffff"];

colors.forEach(function (color) {

  var leader = createPoint(color);

  var i = total;
  while (i--) {
    var alpha = (i + 1) / total;
    leader = createLine(leader, alpha, color);
  }
});

TweenLite.from("line, circle", 1.5, { alpha: 0 });

function createPoint(fill) {

  var circle = document.createElementNS(svgns, "circle");
  root.appendChild(circle);

  var radius = random(75, 125);

  TweenLite.set(circle, {
    attr: { r: 2.5, fill: fill },
    x: random(-twoPi, twoPi),
    y: random(-twoPi, twoPi)
  });

  TweenMax.to(circle, random(2, 6), {
    x: "+=" + twoPi,
    repeat: -1,
    modifiers: {
      x: function x(_x) {
        return cx + Math.cos(_x) * radius;
      }
    }
  });

  TweenMax.to(circle, random(2, 6), {
    y: "+=" + twoPi,
    repeat: -1,
    modifiers: {
      y: function y(_y) {
        return cy + Math.sin(_y) * radius;
      }
    }
  });

  return circle._gsTransform;
}

function createLine(leader, alpha, stroke) {

  var line = document.createElementNS(svgns, "line");
  root.appendChild(line);

  TweenLite.set(line, {
    alpha: alpha,
    stroke: stroke,
    x: cx,
    y: cy
  });

  var pos = line._gsTransform;

  TweenMax.to(line, 1000, {
    x: "+=1",
    y: "+=1",
    repeat: -1,
    modifiers: {
      x: function x(_x2) {
        _x2 = pos.x + (leader.x - pos.x) * ease;
        line.setAttribute("x2", leader.x - _x2);
        return _x2;
      },
      y: function y(_y2) {
        _y2 = pos.y + (leader.y - pos.y) * ease;
        line.setAttribute("y2", leader.y - _y2);
        return _y2;
      }
    }
  });

  return pos;
}

function random(min, max) {
  if (max == null) {
    max = min;min = 0;
  }
  return Math.random() * (max - min) + min;
}