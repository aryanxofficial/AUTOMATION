// let minimilist=require("minimilist");
//node hackerRankAutomation.js --url=https://www.hackerrank.com/ --config=config.json

//npm init -y
//npm install puppeteer
//npm install minimist
//i dont know how to write config file

let puppeteer=require("puppeteer");
// let minimist =require("minimist");
let fs=require("fs"); //although i have not useed this library anywhere

// let args=minimist(process.argv);

// let configJSON=fs.readFileSync(args.config,"utf-8");
// let configJSO=JSON.parse(configJSON);

run();

async function run(){
    let browser=await puppeteer.launch({
        headless:false,
        args:[
            '--start-maximized' //to open the browser in full screen
        ], 
        defaultViewport:false,
        slowMo:50
    })

    let pages=await browser.pages();
    let page=pages[0];
    await page.goto("https://10fastfingers.com/");
}
