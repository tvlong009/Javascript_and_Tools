// angular2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/forms';
import '@angular/http';
import '@angular/router';

import 'rxjs';
import 'lodash';

if (ENV === 'production') {
} else {
  require('angular2-hmr');
}
