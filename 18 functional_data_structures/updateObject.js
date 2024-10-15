const { deepCopy } = require("./deepCopy");
const { deepFreeze } = require("./deepFreeze");

const setByPath = (obj, path, value) => {
  if (!(path[0] in obj)) {
    obj[path[0]] =
      path.length === 1 ? null : Number.isInteger(path[1]) ? [] : {};
  }

  if (path.length === 1) {
    obj[path[0]] = value;
    return obj;
  } else {
    return setByPath(path.slice(1), value, obj[path[0]]);
  }
};

const updateObject = (obj, path, value) => {
  const newObj = deepCopy(obj);
  setByPath(newObj, path, value);
  return deepFreeze(newObj);
};

module.exports = { updateObject };
