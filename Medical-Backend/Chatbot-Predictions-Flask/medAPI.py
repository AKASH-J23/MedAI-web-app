from bs4 import BeautifulSoup
import requests

cookies = {
    '_ga': 'GA1.1.894891176.1699107406',
    'bot_cookie': '65467777675f31339841761',
    '_ga_DD778LJD34': 'GS1.1.1699116919.2.1.1699116927.52.0.0',
}

headers = {
    'authority': 'drgalen.org',
    'accept': '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    # 'cookie': '_ga=GA1.1.894891176.1699107406; bot_cookie=65467777675f31339841761; _ga_DD778LJD34=GS1.1.1699116919.2.1.1699116927.52.0.0',
    'origin': 'https://drgalen.org',
    'pragma': 'no-cache',
    'referer': 'https://drgalen.org/free-ai-doctor/',
    'sec-ch-ua': '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"',
    'sec-ch-ua-mobile': '?1',
    'sec-ch-ua-platform': '"Android"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Mobile Safari/537.36',
    'x-requested-with': 'XMLHttpRequest',
}

def getAPI_Bot(data):
    data = {
        'ai_message': data,
    }
    response = requests.post('https://drgalen.org/free-ai-doctor/ai-response.php', cookies=cookies, headers=headers, data=data)
    soup = BeautifulSoup(response.content, 'html.parser')
    p_tag = soup.find('p')
    if p_tag:
        extracted_text = p_tag.get_text()
        return extracted_text
    else:
        return "Error in the API"