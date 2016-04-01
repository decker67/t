
log = ((console) => {

  return {
    info, warn, error
  };

  function info() {
    console.info.apply(console, arguments);
  }

  function warn() {
    console.warn.apply(console, arguments);
  }

  function error() {
    console.error.apply(console, arguments);
  }


})(console);