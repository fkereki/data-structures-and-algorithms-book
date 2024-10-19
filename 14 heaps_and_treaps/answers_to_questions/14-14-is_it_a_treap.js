function isTreap(tr, valid = () => true) {
  return (
    tr === null ||
    (valid(tr) &&
      isTreap(tr.left, (t) => t.key <= tr.key && t.priority <= tr.priority) &&
      isTreap(tr.right, (t) => t.key >= tr.key && t.priority <= tr.priority))
  );
}

console.log(
  isTreap({
    key: 22,
    priority: 0.9731,
    left: {
      key: 12,
      priority: 0.9404,
      left: {
        key: 4,
        priority: 0.705,
        left: null,
        right: {
          key: 9,
          priority: 0.6722,
          left: null,
          right: {
            key: 11,
            priority: 0.6439,
            left: null,
            right: null
          }
        }
      },
      right: null
    },
    right: {
      key: 40,
      priority: 0.773,
      left: {
        key: 24,
        priority: 0.6503,
        left: null,
        right: {
          key: 34,
          priority: 0.0819,
          left: null,
          right: null
        }
      },
      right: {
        key: 56,
        priority: 0.5117,
        left: null,
        right: {
          key: 60,
          priority: 0.1163,
          left: null,
          right: null
        }
      }
    }
  })
);

console.log(
  isTreap({
    key: 22,
    priority: 0.9731,
    left: {
      key: 12,
      priority: 0.9404,
      left: {
        key: 4,
        priority: 0.705,
        left: null,
        right: {
          key: 9,
          priority: 0.8722 /* wrong! */,
          left: null,
          right: {
            key: 11,
            priority: 0.6439,
            left: null,
            right: null
          }
        }
      },
      right: null
    },
    right: {
      key: 40,
      priority: 0.773,
      left: {
        key: 24,
        priority: 0.6503,
        left: null,
        right: {
          key: 34,
          priority: 0.0819,
          left: null,
          right: null
        }
      },
      right: {
        key: 56,
        priority: 0.5117,
        left: null,
        right: {
          key: 60,
          priority: 0.1163,
          left: null,
          right: null
        }
      }
    }
  })
);

console.log(
  isTreap({
    key: 22,
    priority: 0.9731,
    left: {
      key: 12,
      priority: 0.9404,
      left: {
        key: 4,
        priority: 0.705,
        left: null,
        right: {
          key: 9,
          priority: 0.6722,
          left: null,
          right: {
            key: 11,
            priority: 0.6439,
            left: null,
            right: null
          }
        }
      },
      right: null
    },
    right: {
      key: 40,
      priority: 0.773,
      left: {
        key: 224 /* wrong! */,
        priority: 0.6503,
        left: null,
        right: {
          key: 34,
          priority: 0.0819,
          left: null,
          right: null
        }
      },
      right: {
        key: 56,
        priority: 0.5117,
        left: null,
        right: {
          key: 60,
          priority: 0.1163,
          left: null,
          right: null
        }
      }
    }
  })
);
