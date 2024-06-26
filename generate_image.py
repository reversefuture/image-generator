import sys
import os
from selenium import webdriver

def main():
    if len(sys.argv) != 3:
        print("Usage: python generate_image.py <html_file_path> <image_path>")
        sys.exit(1)

    html_file_path = sys.argv[1]
    image_path = sys.argv[2]

    # Configure Selenium to use Chrome WebDriver
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')  # Run Chrome in headless mode
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')


    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('--headless')  # Optional: Run in headless mode
    driver = webdriver.Chrome(executable_path='/usr/local/bin/chromedriver', options=chrome_options)
    # driver = webdriver.Chrome(options=options)

    try:
        # Load HTML content in Chrome and capture a screenshot
        driver.get(f'file://{os.path.abspath(html_file_path)}')
        driver.save_screenshot(image_path)
        return None  # Return None if successful
    except Exception as e:
        return str(e)  # Return the error message if an exception occurs
    finally:
        driver.quit()

if __name__ == "__main__":
    main()
