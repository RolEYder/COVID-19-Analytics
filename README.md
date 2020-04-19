# COVID-19 API 

## Motivation
The new **coronavirus** has brought us chaos and economical destruction. However, we can learn about it, learning how to be better...   Not matter what times we fall, always we **stand up.** 


# API usage

This is a simple a quick API that helps us view all cases of **SARS-CoV-19**.  The Data has been provided by  [**Novel Coronavirus (COVID-19) Cases Datan**](https://data.humdata.org/dataset/novel-coronavirus-2019-ncov-cases). Only that we do is transform all .csv datasets to JavaScript Object Notation (JSON) requests. 
[![asciicast](https://asciinema.org/a/WSKKykASBItrK8idSwjaxP050.svg)](https://asciinema.org/a/WSKKykASBItrK8idSwjaxP050)

## JSON request structure
![enter image description here](https://i.imgur.com/d6Xh3i6.png)

|         PROPERTY       |DESCRIPTION                      |TYPE OF VALUE                         |
|----------------|-------------------------------|-----------------------------|
| `"CountryRegion"`|        Country or Region  request.    |`String`           |
|`"ProvinceState"`          |Province or State request.           |`String`              |
|  `"Total"`        |Total of cases(deaths, recoved or confirmed) depending on what kind of request are. |`String`   |
|`"Lat"`          |Country/Region or Province/State latitude.|`String`|
|`"Long"`          |Country/Region or Province/State longitude.|`String`   |




## CURL 
	
    $ curl https://api-sars-cov-19.herokuapp.com/api/deaths | fx
    
   
   
> fx is a Command-line JSON processing tool. [More](https://github.com/antonmedv/fx)

 - To show a reduce view:

  `$ curl https://api-sars-cov-19.herokuapp.com/api/deaths/reduced | fx`
