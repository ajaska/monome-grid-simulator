"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = monomeGrid;
exports.KeyState = void 0;

var _blessed = _interopRequireDefault(require("blessed"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var KeyState;
exports.KeyState = KeyState;

(function (KeyState) {
  KeyState[KeyState["Up"] = 0] = "Up";
  KeyState[KeyState["Down"] = 1] = "Down";
})(KeyState || (exports.KeyState = KeyState = {}));

var brightnessToColor = {
  0: "#000000",
  1: "#111111",
  2: "#222222",
  3: "#333333",
  4: "#444444",
  5: "#555555",
  6: "#666666",
  7: "#777777",
  8: "#888888",
  9: "#999999",
  10: "#aaaaaa",
  11: "#bbbbbb",
  12: "#cccccc",
  13: "#dddddd",
  14: "#eeeeee",
  15: "#ffffff"
};

var MonomeGridSimulator =
/*#__PURE__*/
function () {
  function MonomeGridSimulator() {
    _classCallCheck(this, MonomeGridSimulator);

    _defineProperty(this, "screen", void 0);

    _defineProperty(this, "boxes", void 0);

    _defineProperty(this, "keyHandler", void 0);

    this.screen = _blessed.default.screen({
      smartCSR: true
    });
    this.screen.title = "Monome Simulator"; // Quit on Escape, q, or Control-C.

    this.screen.key(["escape", "q", "C-c"], function (ch, key) {
      return process.exit(0);
    });
    var boxes = [];

    for (var row = 0; row < 8; row++) {
      var rowElems = [];

      for (var col = 0; col < 16; col++) {
        rowElems.push(this.addBoxAtGridPos(col, row));
      }

      boxes.push(rowElems);
    }

    this.boxes = boxes;
    this.screen.render();
  }

  _createClass(MonomeGridSimulator, [{
    key: "refresh",
    value: function refresh(led) {
      if (led.length < 8) {
        throw new Error("Invalid shape of argument to refresh: ".concat(JSON.stringify(led)));
      }

      for (var row = 0; row < 8; row++) {
        if (led[row].length < 16) {
          throw new Error("Invalid shape of argument to refresh: ".concat(JSON.stringify(led)));
        }

        for (var col = 0; col < 16; col++) {
          var _brightness = led[row][col];
          var color = brightnessToColor[_brightness];

          if (color == null) {
            throw new Error("Invalid brightness: ".concat(_brightness));
          }

          this.boxes[row][col].style.bg = color;
          this.boxes[row][col].setContent("".concat(_brightness || ""));
        }
      }

      this.screen.render();
    }
  }, {
    key: "key",
    value: function key(keyHandler) {
      this.keyHandler = keyHandler;
    }
  }, {
    key: "handleBoxMouseEvent",
    value: function handleBoxMouseEvent(i, j, s) {
      if (this.keyHandler) this.keyHandler(i, j, s);
    }
  }, {
    key: "addBoxAtGridPos",
    value: function addBoxAtGridPos(col, row) {
      var _this = this;

      var box = _blessed.default.box({
        width: 5,
        height: 4,
        left: 7 * col,
        top: 5 * row,
        border: {
          type: "line"
        },
        style: {
          bg: brightnessToColor[0],
          border: {
            fg: "white"
          }
        }
      });

      box.on("mousedown", function () {
        _this.handleBoxMouseEvent(col, row, KeyState.Down);
      });
      box.on("mouseup", function () {
        _this.handleBoxMouseEvent(col, row, KeyState.Up);
      });
      this.screen.append(box);
      return box;
    }
  }]);

  return MonomeGridSimulator;
}();

function monomeGrid() {
  return _monomeGrid.apply(this, arguments);
}

function _monomeGrid() {
  _monomeGrid = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new MonomeGridSimulator());

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _monomeGrid.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJLZXlTdGF0ZSIsImJyaWdodG5lc3NUb0NvbG9yIiwiTW9ub21lR3JpZFNpbXVsYXRvciIsInNjcmVlbiIsImJsZXNzZWQiLCJzbWFydENTUiIsInRpdGxlIiwia2V5IiwiY2giLCJwcm9jZXNzIiwiZXhpdCIsImJveGVzIiwicm93Iiwicm93RWxlbXMiLCJjb2wiLCJwdXNoIiwiYWRkQm94QXRHcmlkUG9zIiwicmVuZGVyIiwibGVkIiwibGVuZ3RoIiwiRXJyb3IiLCJKU09OIiwic3RyaW5naWZ5IiwiYnJpZ2h0bmVzcyIsImNvbG9yIiwic3R5bGUiLCJiZyIsInNldENvbnRlbnQiLCJrZXlIYW5kbGVyIiwiaSIsImoiLCJzIiwiYm94Iiwid2lkdGgiLCJoZWlnaHQiLCJsZWZ0IiwidG9wIiwiYm9yZGVyIiwidHlwZSIsImZnIiwib24iLCJoYW5kbGVCb3hNb3VzZUV2ZW50IiwiRG93biIsIlVwIiwiYXBwZW5kIiwibW9ub21lR3JpZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7OztJQUVZQSxROzs7V0FBQUEsUTtBQUFBQSxFQUFBQSxRLENBQUFBLFE7QUFBQUEsRUFBQUEsUSxDQUFBQSxRO0dBQUFBLFEsd0JBQUFBLFE7O0FBWVosSUFBTUMsaUJBQStELEdBQUc7QUFDdEUsS0FBRyxTQURtRTtBQUV0RSxLQUFHLFNBRm1FO0FBR3RFLEtBQUcsU0FIbUU7QUFJdEUsS0FBRyxTQUptRTtBQUt0RSxLQUFHLFNBTG1FO0FBTXRFLEtBQUcsU0FObUU7QUFPdEUsS0FBRyxTQVBtRTtBQVF0RSxLQUFHLFNBUm1FO0FBU3RFLEtBQUcsU0FUbUU7QUFVdEUsS0FBRyxTQVZtRTtBQVd0RSxNQUFJLFNBWGtFO0FBWXRFLE1BQUksU0Faa0U7QUFhdEUsTUFBSSxTQWJrRTtBQWN0RSxNQUFJLFNBZGtFO0FBZXRFLE1BQUksU0Fma0U7QUFnQnRFLE1BQUk7QUFoQmtFLENBQXhFOztJQW1CTUMs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S0FBSyxFQUFFLENBRGE7QUFFcEJDLFFBQUFBLE1BQU0sRUFBRSxDQUZZO0FBR3BCQyxRQUFBQSxJQUFJLEVBQUUsSUFBSXJCLEdBSFU7QUFJcEJzQixRQUFBQSxHQUFHLEVBQUUsSUFBSXhCLEdBSlc7QUFLcEJ5QixRQUFBQSxNQUFNLEVBQUU7QUFDTkMsVUFBQUEsSUFBSSxFQUFFO0FBREEsU0FMWTtBQVFwQmIsUUFBQUEsS0FBSyxFQUFFO0FBQ0xDLFVBQUFBLEVBQUUsRUFBRXpCLGlCQUFpQixDQUFDLENBQUQsQ0FEaEI7QUFFTG9DLFVBQUFBLE1BQU0sRUFBRTtBQUNORSxZQUFBQSxFQUFFLEVBQUU7QUFERTtBQUZIO0FBUmEsT0FBWixDQUFWOztBQWdCQVAsTUFBQUEsR0FBRyxDQUFDUSxFQUFKLENBQU8sV0FBUCxFQUFvQixZQUFNO0FBQ3hCLFFBQUEsS0FBSSxDQUFDQyxtQkFBTCxDQUF5QjNCLEdBQXpCLEVBQThCRixHQUE5QixFQUFtQ1osUUFBUSxDQUFDMEMsSUFBNUM7QUFDRCxPQUZEO0FBSUFWLE1BQUFBLEdBQUcsQ0FBQ1EsRUFBSixDQUFPLFNBQVAsRUFBa0IsWUFBTTtBQUN0QixRQUFBLEtBQUksQ0FBQ0MsbUJBQUwsQ0FBeUIzQixHQUF6QixFQUE4QkYsR0FBOUIsRUFBbUNaLFFBQVEsQ0FBQzJDLEVBQTVDO0FBQ0QsT0FGRDtBQUlBLFdBQUt4QyxNQUFMLENBQVl5QyxNQUFaLENBQW1CWixHQUFuQjtBQUNBLGFBQU9BLEdBQVA7QUFDRDs7Ozs7O1NBRzJCYSxVOzs7Ozs7OzBCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw2Q0FDTixJQUFJM0MsbUJBQUosRUFETTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJsZXNzZWQgZnJvbSBcImJsZXNzZWRcIjtcblxuZXhwb3J0IGVudW0gS2V5U3RhdGUge1xuICBVcCA9IDAsXG4gIERvd24gPSAxXG59XG5cbnR5cGUgS2V5SGFuZGxlciA9ICh4OiBudW1iZXIsIHk6IG51bWJlciwgczogS2V5U3RhdGUpID0+IHZvaWQ7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9ub21lR3JpZCB7XG4gIHJlZnJlc2gobGVkczogbnVtYmVyW11bXSk6IHZvaWQ7XG4gIGtleShrZXlIYW5kbGVyOiBLZXlIYW5kbGVyKTogdm9pZDtcbn1cblxuY29uc3QgYnJpZ2h0bmVzc1RvQ29sb3I6IHsgW2JyaWdodG5lc3M6IG51bWJlcl06IHN0cmluZyB8IHVuZGVmaW5lZCB9ID0ge1xuICAwOiBcIiMwMDAwMDBcIixcbiAgMTogXCIjMTExMTExXCIsXG4gIDI6IFwiIzIyMjIyMlwiLFxuICAzOiBcIiMzMzMzMzNcIixcbiAgNDogXCIjNDQ0NDQ0XCIsXG4gIDU6IFwiIzU1NTU1NVwiLFxuICA2OiBcIiM2NjY2NjZcIixcbiAgNzogXCIjNzc3Nzc3XCIsXG4gIDg6IFwiIzg4ODg4OFwiLFxuICA5OiBcIiM5OTk5OTlcIixcbiAgMTA6IFwiI2FhYWFhYVwiLFxuICAxMTogXCIjYmJiYmJiXCIsXG4gIDEyOiBcIiNjY2NjY2NcIixcbiAgMTM6IFwiI2RkZGRkZFwiLFxuICAxNDogXCIjZWVlZWVlXCIsXG4gIDE1OiBcIiNmZmZmZmZcIlxufTtcblxuY2xhc3MgTW9ub21lR3JpZFNpbXVsYXRvciBpbXBsZW1lbnRzIE1vbm9tZUdyaWQge1xuICBzY3JlZW46IGJsZXNzZWQuV2lkZ2V0cy5TY3JlZW47XG4gIGJveGVzOiBibGVzc2VkLldpZGdldHMuQm94RWxlbWVudFtdW107XG4gIGtleUhhbmRsZXI/OiBLZXlIYW5kbGVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc2NyZWVuID0gYmxlc3NlZC5zY3JlZW4oeyBzbWFydENTUjogdHJ1ZSB9KTtcbiAgICB0aGlzLnNjcmVlbi50aXRsZSA9IFwiTW9ub21lIFNpbXVsYXRvclwiO1xuXG4gICAgLy8gUXVpdCBvbiBFc2NhcGUsIHEsIG9yIENvbnRyb2wtQy5cbiAgICB0aGlzLnNjcmVlbi5rZXkoW1wiZXNjYXBlXCIsIFwicVwiLCBcIkMtY1wiXSwgZnVuY3Rpb24oY2gsIGtleSkge1xuICAgICAgcmV0dXJuIHByb2Nlc3MuZXhpdCgwKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGJveGVzID0gW107XG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgODsgcm93KyspIHtcbiAgICAgIGNvbnN0IHJvd0VsZW1zOiBibGVzc2VkLldpZGdldHMuQm94RWxlbWVudFtdID0gW107XG4gICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCAxNjsgY29sKyspIHtcbiAgICAgICAgcm93RWxlbXMucHVzaCh0aGlzLmFkZEJveEF0R3JpZFBvcyhjb2wsIHJvdykpO1xuICAgICAgfVxuICAgICAgYm94ZXMucHVzaChyb3dFbGVtcyk7XG4gICAgfVxuICAgIHRoaXMuYm94ZXMgPSBib3hlcztcblxuICAgIHRoaXMuc2NyZWVuLnJlbmRlcigpO1xuICB9XG5cbiAgcmVmcmVzaChsZWQ6IG51bWJlcltdW10pIHtcbiAgICBpZiAobGVkLmxlbmd0aCA8IDgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYEludmFsaWQgc2hhcGUgb2YgYXJndW1lbnQgdG8gcmVmcmVzaDogJHtKU09OLnN0cmluZ2lmeShsZWQpfWBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgODsgcm93KyspIHtcbiAgICAgIGlmIChsZWRbcm93XS5sZW5ndGggPCAxNikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYEludmFsaWQgc2hhcGUgb2YgYXJndW1lbnQgdG8gcmVmcmVzaDogJHtKU09OLnN0cmluZ2lmeShsZWQpfWBcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgMTY7IGNvbCsrKSB7XG4gICAgICAgIGxldCBicmlnaHRuZXNzID0gbGVkW3Jvd11bY29sXTtcbiAgICAgICAgbGV0IGNvbG9yID0gYnJpZ2h0bmVzc1RvQ29sb3JbYnJpZ2h0bmVzc107XG4gICAgICAgIGlmIChjb2xvciA9PSBudWxsKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGJyaWdodG5lc3M6ICR7YnJpZ2h0bmVzc31gKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJveGVzW3Jvd11bY29sXS5zdHlsZS5iZyA9IGNvbG9yO1xuICAgICAgICB0aGlzLmJveGVzW3Jvd11bY29sXS5zZXRDb250ZW50KGAke2JyaWdodG5lc3MgfHwgXCJcIn1gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNjcmVlbi5yZW5kZXIoKTtcbiAgfVxuXG4gIGtleShrZXlIYW5kbGVyOiBLZXlIYW5kbGVyKSB7XG4gICAgdGhpcy5rZXlIYW5kbGVyID0ga2V5SGFuZGxlcjtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlQm94TW91c2VFdmVudChpOiBudW1iZXIsIGo6IG51bWJlciwgczogS2V5U3RhdGUpIHtcbiAgICBpZiAodGhpcy5rZXlIYW5kbGVyKSB0aGlzLmtleUhhbmRsZXIoaSwgaiwgcyk7XG4gIH1cblxuICBwcml2YXRlIGFkZEJveEF0R3JpZFBvcyhjb2w6IG51bWJlciwgcm93OiBudW1iZXIpIHtcbiAgICBsZXQgYm94ID0gYmxlc3NlZC5ib3goe1xuICAgICAgd2lkdGg6IDUsXG4gICAgICBoZWlnaHQ6IDQsXG4gICAgICBsZWZ0OiA3ICogY29sLFxuICAgICAgdG9wOiA1ICogcm93LFxuICAgICAgYm9yZGVyOiB7XG4gICAgICAgIHR5cGU6IFwibGluZVwiXG4gICAgICB9LFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgYmc6IGJyaWdodG5lc3NUb0NvbG9yWzBdLFxuICAgICAgICBib3JkZXI6IHtcbiAgICAgICAgICBmZzogXCJ3aGl0ZVwiXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGJveC5vbihcIm1vdXNlZG93blwiLCAoKSA9PiB7XG4gICAgICB0aGlzLmhhbmRsZUJveE1vdXNlRXZlbnQoY29sLCByb3csIEtleVN0YXRlLkRvd24pO1xuICAgIH0pO1xuXG4gICAgYm94Lm9uKFwibW91c2V1cFwiLCAoKSA9PiB7XG4gICAgICB0aGlzLmhhbmRsZUJveE1vdXNlRXZlbnQoY29sLCByb3csIEtleVN0YXRlLlVwKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2NyZWVuLmFwcGVuZChib3gpO1xuICAgIHJldHVybiBib3g7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gbW9ub21lR3JpZCgpIHtcbiAgcmV0dXJuIG5ldyBNb25vbWVHcmlkU2ltdWxhdG9yKCk7XG59XG4iXX0=