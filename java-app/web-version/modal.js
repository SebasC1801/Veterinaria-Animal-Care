/**
 * Reusable Modal controller with simple prop validation.
 * IIFE/UMD style to attach `ModalController` to `window` for non-module usage.
 */
(function(){
  /**
   * @typedef {Object} ModalOptions
   * @property {string} [closeSelector] - Selector for elements that close the modal.
   * @property {boolean} [backdropClickClose] - Close when clicking backdrop.
   * @property {function} [onOpen] - Callback fired after opening.
   * @property {function} [onClose] - Callback fired after closing.
   */
  function validateModalOptions(opts){
    const errors = [];
    if (opts == null) return errors;
    if (opts.closeSelector && typeof opts.closeSelector !== 'string') errors.push('closeSelector debe ser string');
    if (opts.backdropClickClose != null && typeof opts.backdropClickClose !== 'boolean') errors.push('backdropClickClose debe ser boolean');
    if (opts.onOpen && typeof opts.onOpen !== 'function') errors.push('onOpen debe ser función');
    if (opts.onClose && typeof opts.onClose !== 'function') errors.push('onClose debe ser función');
    if (errors.length){ console.warn('[ModalOptions] Validación:', errors.join('; ')); }
    return errors;
  }

  class ModalController{
    /**
     * @param {HTMLElement|string} elementOrSelector - Modal element or selector.
     * @param {ModalOptions} [options]
     */
    constructor(elementOrSelector, options={}){
      validateModalOptions(options);
      this.el = typeof elementOrSelector === 'string' ? document.querySelector(elementOrSelector) : elementOrSelector;
      if (!this.el) throw new Error('ModalController: elemento no encontrado');
      this.options = Object.assign({ closeSelector: '.close-btn, .btn-secondary[data-close]', backdropClickClose: true }, options);
      this._bind();
    }
    _bind(){
      // Close by backdrop
      this.el.addEventListener('click', (ev)=>{
        if (this.options.backdropClickClose && ev.target === this.el){
          this.close();
        }
      });
      // Close buttons inside
      const closeEls = this.el.querySelectorAll(this.options.closeSelector);
      closeEls.forEach(btn => btn.addEventListener('click', ()=> this.close()));
    }
    open(){
      this.el.style.display = 'flex';
      this.el.classList.add('open');
      if (typeof this.options.onOpen === 'function') this.options.onOpen();
    }
    close(){
      this.el.classList.remove('open');
      this.el.style.display = 'none';
      if (typeof this.options.onClose === 'function') this.options.onClose();
    }
  }

  if (typeof window !== 'undefined'){ window.ModalController = ModalController; }
})();