/*
 * ToastFs
 * Copyright 2019
 * Author: Faisal Rashid
 * All Rights Reserved.
 * Use, reproduction, distribution, and modification of this code is subject to the terms and
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * Project: https://github.com/FaisalST32/fs-toast
 */

function ToastFs() {

    let _this = this;
    let toastHtml = `
                            <div class="fstoast-body">
                                <span class="fstoast-message-mark"></span>
                                <span class="fstoast-message">This is the test notification</span>
                            </div>
                            <button class="fstoast-close-button">&#10006;</button>
                    `;

    let sign = {
        success: '&#9989;',
        error: '&#10060;'
    }

    this.toast;

    this.success = (message) => {
        showToast(sign.success, message);

    }
    this.error = (message) => {
        showToast(sign.error, message);
    }

    this.remove = () => {
        if (this.toast) {
            let oldToast = document.querySelector('.fstoast-container');
            if (!oldToast)
                return;
            oldToast.classList.remove(['fstoast-active']);
            var interval = setInterval(() => {
                document.querySelector('body').removeChild(oldToast);
                clearInterval(interval);
            }, 500)
        }
    }

    function showToast(symbol, message) {
        _this.remove();
        _this.toast = createToast();
        _this.toast.querySelector('.fstoast-message-mark').innerHTML = symbol;
        attachMessage(message);
        addButtonEvents();

        document.querySelector('body').appendChild(_this.toast);

        var interval = setInterval(() => {
            _this.toast.classList.add(['fstoast-active']);
            clearInterval(interval);
        }, 500)
    }

    function createToast() {
        let toast_el = document.createElement('div');
        toast_el.classList.add(['fstoast-container']);
        toast_el.innerHTML = toastHtml;
        return toast_el;
    }

    function attachMessage(message) {
        _this.toast.querySelector('.fstoast-message').innerHTML = message;

    }

    function addButtonEvents() {
        _this.toast.querySelector('.fstoast-close-button').addEventListener('click', _this.remove);
    }
}

var toastfs = new ToastFs;