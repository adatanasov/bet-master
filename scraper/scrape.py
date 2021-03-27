import time
from selenium import webdriver
from bs4 import BeautifulSoup
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

def scrape_products():
    options = webdriver.ChromeOptions()
    options.add_experimental_option("excludeSwitches", ['enable-automation', 'enable-logging'])
    options.add_experimental_option("useAutomationExtension", False)

    # options.add_argument("headless") 
    options.add_argument('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36')
    options.add_argument("start-maximized")
    options.add_argument("--no-sandbox") 
    options.add_argument("--ignore-certificate-errors")
    options.add_argument('--disable-gpu')
    options.add_argument("--disable-backgrounding-occluded-windows") 
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--disable-blink-features=AutomationControlled')
    browser = webdriver.Chrome(ChromeDriverManager().install(), options=options)

    # Avoid detection
    browser.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
    "source": """
    Object.defineProperty(navigator, 'webdriver', {
    get: () => undefined
    })
    """
    })

    browser.execute_cdp_cmd('Network.setUserAgentOverride',
    {"userAgent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36'})

    # browser.get("https://www.bet365.com/#/AC/B1/C1/D13/E51761579/F2/")
    browser.get("https://www.bet365.com")

    print("Website loaded")

    # wait = WebDriverWait(driver, 10, poll_frequency=1)
    # league = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "sph-EventHeader_Label")))

    # matchWrapper = browser.find_elements_by_class_name('rcl-ParticipantFixtureDetails')

    # for match in matchWrapper:
    #     hour = match.find_element_by_class_name('rcl-ParticipantFixtureDetails_BookCloses').text

    #     print(hour)


if __name__ == "__main__":
        scrape_products()