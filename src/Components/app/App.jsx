import React, { useRef, useState } from 'react'
import {  useGetAllDataQuery, useGetLatestDataQuery } from '../../features/api/Api';
import './App.css'
import axios from 'axios';
function App() {
    const data = useGetAllDataQuery();
    const [showMore, setShowMore] = useState(10);
    const ref = useRef(null);
    const LatestNews = useGetLatestDataQuery()
    const [cars , setCars] = useState([])
    const [randomNumber, ] = useState(Math.floor(Math.random() * 100) + 1);
    const [pageNum , setPageNum] = useState(21);
    if (data.isLoading || LatestNews.isLoading) {
        return <div className="center lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>;
    }
    const handleShowMore = () => {
        setShowMore(showMore + 10);
    }
    const handleSearch = async() => {
        const data = await axios.get(`https://newsapi.org/v2/everything?q=${ref.current.value}&apiKey=71603a87269c451b8ce7706ea41037f1`)
        setCars(data.data.articles);
    }
  return (
    <div>
 
            <div className="shell">
                <div id="header">
                    <h1 id="logo"><a href="">Tesla News</a></h1>
                </div>
                <div id="content">
                    <div id="sidebar">
                    <div  className="search">
                        <div className="cl">&nbsp;</div>
                        <input type="text" className="field blink" ref={ref} title="search" />
                        <div className="btnp">
                        <button onClick={handleSearch} className='search-button'>Go</button>
                        </div>
                        <div className="cl">&nbsp;</div>
                    </div>
                    
                    <div className="box">
                        <h2>Search Car Type</h2>
                        <ul>
                        {
                            cars?.map((item, index) => {
                                if (!item.urlToImage || !item.title || !item.description) {
                                    return 
                                }   
                                if (index > 3) {
                                    return
                                }
                                return (
                                    <li> <a href={`${item.url}`} className="image"><img src={`${item.urlToImage}`} width={50} height={50} alt="" /></a>
                                        <div className="info">
                                        <h5>{item.title}</h5>
                                        <p>{item.description}</p>
                                        </div>
                                        <div className="cl">&nbsp;</div>
                                        <hr />
                                    </li>
                                );
                            })
                        }
                        </ul>
                        
                        <div className="cl">&nbsp;</div>
                    </div>
                    <div className="box">
                        <h2>Latest News</h2>
                        <ul>
                        {
                            LatestNews?.data?.articles?.map((item, index) => {
                                if (!item.urlToImage || !item.title || !item.description) {
                                    return 
                                }
                                if (index > 4) {
                                    return
                                }
                                return (
                                    <li> <a href={`${item.url}`} className="image"><img src={`${item.urlToImage}`} width={70} height={70} alt="" /></a>
                                        <div className="info">
                                            <h5><a href={`{${item.url}}`}>{item.author}</a></h5>
                                            <p>{item.description}.</p>
                                        </div>
                                        <div className="cl">&nbsp;</div>
                                        <hr />
                                    </li>
                                    
                                )
                            })
                        }   
                        </ul>
                        <div className="cl">&nbsp;</div>
                    </div>

                    </div>
                    <div id="main">
                    <ul className="navigate">
                        <li className={pageNum === 21 ? "active" : ""} onClick={()=>setPageNum(21)}><a href="#">1</a></li>
                        <li className={pageNum === 22 ? "active" : ""} onClick={()=>setPageNum(22)}><a href="#">2</a></li>
                        <li className={pageNum === 23 ? "active" : ""} onClick={()=>setPageNum(23)}><a href="#">3</a></li>
                        <li className={pageNum === 24 ? "active" : ""} onClick={()=>setPageNum(24)}><a href="#">4</a></li>
                        <li className={pageNum === 25 ? "active" : ""} onClick={()=>setPageNum(25)}><a href="#">5</a></li>
                    </ul>
                    <div className="transparent-frame">
                        <div className="frame">&nbsp;</div>
                        <img src={`${data?.data?.articles[data?.data?.articles.length - pageNum].urlToImage}}`} alt="" width={550} height={285} /> </div>
                    <div className="cl">&nbsp;</div>
                    <div className="box">
                        <h2>Varied News</h2>
                        <ul className="line">
                        <li> <a className="frm" href="#"><img src={data?.data?.articles[data?.data?.articles.length - randomNumber - 1].urlToImage} width={182} height={135} alt="" /></a> <a href={`${data?.data?.articles[data?.data?.articles.length - randomNumber - 1].url}`}>{data?.data?.articles[data?.data?.articles.length - randomNumber - 1].author?.substr(1,15)}</a> </li>
                        <li> <a className="frm" href="#"><img src={data?.data?.articles[data?.data?.articles.length - randomNumber - 2].urlToImage} width={182} height={135} alt="" /></a> <a href={`${data?.data?.articles[data?.data?.articles.length - randomNumber - 2].url}`}>{data?.data?.articles[data?.data?.articles.length - randomNumber - 2].author?.substr(1,15)}</a> </li>
                        <li> <a className="frm" href="#"><img src={data?.data?.articles[data?.data?.articles.length - randomNumber - 3].urlToImage} width={182} height={135} alt="" /></a> <a href={`${data?.data?.articles[data?.data?.articles.length - randomNumber - 3].url}`}>{data?.data?.articles[data?.data?.articles.length - randomNumber - 3 ].author?.substr(1,15)}</a> </li>
                        </ul>
                        <div className="cl">&nbsp;</div>
                    </div>
                    <div className="box">
                        <h2>Tesla News</h2>
                        <ul>
                        {
                            data?.data?.articles?.map((item, index) => {
                                if (!item.urlToImage || !item.title || !item.description) {
                                    return
                                }
                                if (index > showMore) {
                                    return
                                }
                                return (
                                    <li> <a href="#" className="image"><img src={`${item.urlToImage}`} width={179} height={119} alt="" /></a>
                                        <div className="info">
                                        <h4><a href="#">{item.title}</a></h4>
                                        <p>{item.description}.</p>
                                        <a href={`${item.url}`} className="up">read more</a> </div>
                                        <div className="cl">&nbsp;</div>
                                    </li>
                                    
                                )
                            })
                        }   
                        
                        </ul>
                        <a onClick={handleShowMore} className="up" >See more</a>
                        <div className="cl">&nbsp;</div>
                    </div>
                    </div>
                    <div className="cl">&nbsp;</div>
                </div>
                <div id="footer">
                    <p>&copy; Sitename.com. Design by <a href="http://chocotemplates.com">ChocoTemplates.com</a></p>
                </div>
            </div>

    
    </div>
  )
}

export default App
