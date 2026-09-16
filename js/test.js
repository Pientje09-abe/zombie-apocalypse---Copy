function build() {
  var remaining = [ 1, 2, 3, 4 ],
      res = [],
      candidate,
      n, sz, sel;

  for(n = 0; n < 4; n++) {
    candidate = remaining.filter(function(v) {
      return v != n + 1 && (!n || Math.abs(res[n - 1] - v) != 1);
    });
    if(!(sz = candidate.length)) {
      return false;
    }
    res.push(sel = candidate[(Math.random() * sz) | 0]);
    remaining.splice(remaining.indexOf(sel), 1);
  }
  return res;
}

while((list = build()) === false) {};
document.write(list.join(' '));