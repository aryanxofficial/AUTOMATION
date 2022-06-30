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
    await page.goto("https://www.hackerrank.com/");

    await page.waitForSelector("a[data-event-action='Login']");
    await page.click("a[data-event-action='Login']");

    await page.waitForSelector(".fl-button-wrap.fl-button-width-auto.fl-button-left>[role='button']");
    await page.click(".fl-button-wrap.fl-button-width-auto.fl-button-left>[role='button']");

    //i am making new variables for every button..
    //sumeet sir types the same attribte again in click(button) again
    //both methods are exactly same

    let userid=await page.waitForSelector("#input-1");
    await userid.type("aryanxofficial@gmail.com");

    let passwordInput=await page.waitForSelector("#input-2");
    await passwordInput.type("_________"); //fill int in the password before running the code

    let login=await page.waitForSelector('[data-analytics="LoginPassword"]');
    await login.click();

    //now i have entered my account till now

    let profileButton=await page.waitForSelector(".username.text-ellipsis");
    await profileButton.click();

    let administration=await page.waitForSelector("[data-analytics='NavBarProfileDropDownAdministration']")
    await administration.click();

    //contest name and owner
    // contestOwner(page);

    // let firstChallengeBtn=await page.waitForSelector(".mmT");
    // await firstChallengeBtn.click();

    //     let moderatorBtn=await waitForSelector("li[data-tab='moderators']")
    //     await moderatorBtn.click();

    //finding all urls on same page of all contests
    await page.waitForSelector("a.backbone.block-center");
    let curls=await page.$$eval("a.backbone.block-center",function(atags){//what $$eval will do is go to the provided html selector and uss selector ke jitne elements honge uska array bnadega and in last we are returning the array in curls
    let urls=[];

    for(let i=0;i< atags.length ; i++){
        let url=atags[i].getAttribute("href");
        urls.push(url);
    }
    // console.log(urls);  ///these 2 statements are not working.
    // console.log(atags);
   
    return urls;
    });
 
  
    console.log(curls);//why is only this statement getting printed
    

    for(let i=0;i<curls.length ;i++){
        let ctab=await browser.newPage();
        await ctab.bringToFront(); // this function highlights the clicked tab  //this line dosen't make any diffference to the working of code
        await ctab.goto("https://www.hackerrank.com" + curls[i]);
        await ctab.waitFor(3000); //bs random thod sa deley add kiya hai

        //this function is createed to add moderators to each contest
        await addModerators(ctab);

        //moderators bhi save krne hai abhi for every challenge 

        await ctab.close();
        await ctab.waitFor(3000);
    }

    async function addModerators(ctab){
        //clicking on moderator tab
        ctab.waitForSelector("li[data-tab='moderators']");
        await ctab.click("li[data-tab='moderators']");

        //typing in the name
        let moderatorInput=await ctab.waitForSelector("input#moderator");
        await moderatorInput.type("blackops1520");

        //now pressing enter
        await ctab.keyboard.press("Enter");

    }


    //just an attemp to print name of every contest and its owner

    // async function contestOwner(page){
    //     let curls=await page.$$eval(".zeta.mmT",function(nameOwner){
    //         let names=[];
    //         let owners=[];

    //         for(let i =0;i<nameOwner.length ; i=i+2){
    //             let name=nameOwner[i].getAttribute("text");
    //             names.push(name);
    //         }

    //         for(let i =1;i<nameOwner.length ; i=i+2){
    //             let owner=nameOwner[i].getAttribute("text");
    //             owners.push(owner);
    //         }

    //         console.log(names);
    //         console.log(names);

    //     });

    //     return names;
    // }

}

run();