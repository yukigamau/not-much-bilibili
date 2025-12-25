// ==UserScript==
// @name         哔哩哔哩提醒
// @namespace    http://tampermonkey.net/
// @version      2025-12-25
// @description  try to take over the world!
// @author       yukigamau
// @match        https://www.bilibili.com/
// @match        https://www.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

(function ()
 {
    'use strict';

    if(changeHome())
    {
        return;
    }

    if(!except())
    {
        return;
    }

    setTimeout(() => {
        document.open();
        document.write(`
            <html>
            <head>
                <meta charset="UTF-8">
                <title>学习！</title>
                <style>
                    body {
                        background: #000000;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        font-size: 80px;
                        font-weight: bold;
                        color: #ffffff;
                        user-select: none;
                        position: relative;
                    }

                    #backBtn {
                        position: fixed;
                        bottom: 40px;
                        right: 40px;
                        padding: 15px 30px;
                        font-size: 28px;
                        background: #ffffff;
                        color: #000000;
                        border-radius: 12px;
                        cursor: pointer;
                        border: none;
                        font-weight: bold;
                    }
                    #backBtn:hover {
                        background: #dddddd;
                    }
                </style>
            </head>
            <body>
                学习
                <button id="backBtn">返回原页面</button>
                <script>
                    document.getElementById("backBtn").onclick = () => {
                        location.reload();
                    };
                </script>
            </body>
            </html>
        `);
        document.close();
    }, 60 * 1000);

})();

function changeHome()
{
    const url=window.location.href;
    if(url=="https://www.bilibili.com/")
    {
        window.location.replace('https://search.bilibili.com/all');
        return true;
    }
    return false;
}

function except()
{
    /** @type {string[]} */
    let queue =[];
    queue.push('');
    const url=window.location.href;
    for(const s of queue)
    {
        if(url==s)
        {
            return false; // 表示这个网页是要放弃管理的
        }
    }
    return true; // 默认是要接管处理的
}
