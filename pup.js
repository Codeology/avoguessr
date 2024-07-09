const { spawn } = require('child_process')
// const child = spawn('pwd')

const puppeteer = require("puppeteer");

async function runPythonScript(scriptPath, args) {

  // Use child_process.spawn method from 
  // child_process module and assign it to variable
  const pyProg = spawn('python', [scriptPath].concat(args));

  // Collect data from script and print to console
  let data = '';
  pyProg.stdout.on('data', (stdout) => {
    data += stdout.toString();
  });

  // Print errors to console, if any
  pyProg.stderr.on('data', (stderr) => {
    console.log(`stderr: ${stderr}`);
  });

  // When script is finished, print collected data
  pyProg.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    console.log(data);
  });
}

(async () => {
  browser = await puppeteer.launch({headless: false, ignoreHTTPSErrors: true,
    args: [`--window-size=1920,1080`],
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });
  page = await browser.newPage();
  await page.goto("https://geoguessr.com/signin");
  try {
    await page.waitForSelector('#onetrust-accept-btn-handler', { timeout: 2000 });
    await page.click('#onetrust-accept-btn-handler');
  } catch (error) {
      console.log('no cookie popup');
  }
  await page.waitForTimeout(500)

  
    
    const userClick = await page.waitForSelector(
      "main.version4_main__DAsSW input[class='text-input_textInput__HPC_k']"
    );
  
    await userClick.click();
  
    await page.keyboard.type("YOUR-EMAIL-HERE");

    await page.waitForTimeout(500)

  
    const passClick = await page.waitForSelector(
      "main.version4_main__DAsSW input[name='password']"
    );
  
    await passClick.click();
  
    await page.keyboard.type("YOUR-PASSWORD-HERE")
    await page.waitForTimeout(500)

  
  
    const loginClick = await page.waitForSelector("main.version4_main__DAsSW span[class='button_label__kpJrA']");
  
    await loginClick.click();
    await page.waitForTimeout(500)

    try {
      const exit = await page.waitForSelector("div.modal_contentContainer__jOaNm button[class = 'modal_closeButton__rq9h_']", { timeout: 2000 });
      await exit.click();
    } catch (error) {
        console.log('nopopup');
    }

    await page.waitForTimeout(500);

    const singlePlayer = await page.waitForSelector("main.version4_main__DAsSW button[class='game-menu-button_button__WPwVi']");
    
    await singlePlayer.click();

    await page.waitForTimeout(500);

    const rightArrow = await page.waitForSelector("main.version4_main__DAsSW button[class='horizontal-scroll-arrows_arrowButton__yOI_1 horizontal-scroll-arrows_right__9X_Cu horizontal-scroll-arrows_rightPadding__7_4xW']")

    await rightArrow.click();

    await page.waitForTimeout(2000);

    await page.mouse.click(450, 650)

    await page.waitForTimeout(2000);

    await page.mouse.click(700, 500)
    
    await page.waitForTimeout(2000);

    await page.mouse.click(960, 555)
    
    await page.waitForTimeout(4000);
    await page.mouse.click(960, 540)
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `image0.jpg` });
    await page.keyboard.down('ArrowRight');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `image1.jpg` });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `image2.jpg` })
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `image3.jpg` })
    await page.keyboard.up('ArrowRight');

    await page.waitForTimeout(1000);
    await runPythonScript("model.py", ["hello", "world"]);

    await page.waitForTimeout(30000);

    await page.mouse.click(960, 540)
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `image0.jpg` });
    await page.keyboard.down('ArrowRight');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `image1.jpg` });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `image2.jpg` })
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `image3.jpg` })
    await page.keyboard.up('ArrowRight');


    await page.waitForTimeout(1000);
    await runPythonScript("model.py", ["hello", "world"]);


    await page.waitForTimeout(30000);


    await page.mouse.click(960, 540)
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `image0.jpg` });
    await page.keyboard.down('ArrowRight');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `image1.jpg` });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `image2.jpg` })
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `image3.jpg` })
    await page.keyboard.up('ArrowRight');


    await page.waitForTimeout(1000);
    await runPythonScript("model.py", ["hello", "world"]);

    await page.waitForTimeout(30000);

    await page.mouse.click(960, 540)
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `image0.jpg` });
    await page.keyboard.down('ArrowRight');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `image1.jpg` });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `image2.jpg` })
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `image3.jpg` })
    await page.keyboard.up('ArrowRight');


    await page.waitForTimeout(1000);
    await runPythonScript("model.py", ["hello", "world"]);

    await page.waitForTimeout(30000);

    await page.mouse.click(960, 540)
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `image0.jpg` });
    await page.keyboard.down('ArrowRight');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `image1.jpg` });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `image2.jpg` })
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `image3.jpg` })
    await page.keyboard.up('ArrowRight');


    await page.waitForTimeout(1000);
    await runPythonScript("model.py", ["hello", "world"]);



    await page.waitForTimeout(30000);

    await browser.close();





})();
