

from bs4 import BeautifulSoup as bs
import pandas as pd
from splinter import Browser

def init_browser():

	executable_path = {"executable_path": "chromedriver"}
	return Browser("chrome", **executable_path, headless=True)


def scrape():

	browser=init_browser()
	mars_data={}

	url = 'https://mars.nasa.gov/news/?page=0&per_page=40&order=publish_date+desc%2Ccreated_at+desc&search=&category=19%2C165%2C184%2C204&blank_scope=Latest'
	browser.visit(url)
	html = browser.html
	soup = bs(html, 'html.parser')
	news_title=soup.find('div',class_='content_title').text
	news_p=soup.find('div',class_='article_teaser_body').text
	mars_data['news_title']=news_title
	mars_data['news_p']=news_p


	browser.visit('https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars')
	browser.click_link_by_partial_text('FULL IMAGE')
	browser.is_text_present('more_info', wait_time=5)
	browser.click_link_by_partial_text('more info')
	browser.click_link_by_partial_href('jpeg')
	featured_image_url=browser.url
	mars_data['featured_image']=featured_image_url

	browser.visit('https://twitter.com/marswxreport?lang=en')
	sp = bs(browser.html, 'html.parser')
	tweets=sp.find_all(class_='js-tweet-text-container')
	mars_weather=tweets[1].find('p').text
	facts=pd.read_html('https://space-facts.com/mars/')
	mars_facts=facts[0]
	table=mars_facts.to_html(header=False,index=False)
	mars_data['mars_facts']=table

	browser.visit('https://twitter.com/marswxreport?lang=en')
	sp = bs(browser.html, 'html.parser')		
	tweets=sp.find_all(class_='js-tweet-text-container')
	mars_weather=tweets[1].find('p').text
	mars_data['weather']= mars_weather


	browser.visit('https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars')
	astro=bs(browser.html,'html.parser')
	names=astro.find_all('h3')
	hemispheres=[]
	for name in names:
		hemispheres.append(name.text.replace(' Enhanced',''))
		img_urls=[]
	for hemisphere in hemispheres:
		browser.is_text_present('hemisphere', wait_time=5)
		browser.click_link_by_partial_text(hemisphere)
		jpgs=bs(browser.html,'html.parser')
		img_urls.append(jpgs.find(class_='downloads').find('li').find('a')['href'])
		browser.back()
	hemisphere_image_urls=[]
	for h,u in zip(hemispheres,img_urls):
		hemisphere_image_urls.append({"title":h,"img_url":u})
	mars_data['hemisphere_image_urls']=hemisphere_image_urls

	return(mars_data)




