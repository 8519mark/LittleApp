import './FrontPage.css'

type props_FrontPage = {
    head : string,
    body : string,
    imageOnRight : boolean;
    imagePercent : number;
    image : string;
    tryMap : boolean;
}

export const FrontPage = (props : props_FrontPage) => {
    return (
        <div className = 'front-page'>
            {props.imageOnRight ? (
                <>
                <div>
                    <h2>{props.head}</h2>
                    <p dangerouslySetInnerHTML = {{ __html: props.body }}></p>
                    {props.tryMap? (<a href='/Map' style ={{textDecoration: 'none'}}>
                        <span className = "front-page-text">Try Map</span>
                    </a>) : (null)}
                </div>
                <div style = {{width : '' + props.imagePercent + '%', height : 'auto'}}>
                    <img src={props.image} alt='temp' className = 'front-page-img'/>
                </div>
                </>
            ) : (
                <>
                <div style = {{width : '' + props.imagePercent + '%', height : 'auto'}}>
                    <img src={props.image} alt='temp' className = 'front-page-img'/>
                </div>
                <div>
                    <h2>{props.head}</h2>
                    <p dangerouslySetInnerHTML = {{ __html: props.body }}></p>
                    {props.tryMap? (<a href='/Map' style ={{textDecoration: 'none'}}>
                        <span className = "front-page-text">Try Map</span>
                    </a>) : (null)}
                </div>
                </>
            )}
        </div>
    )
}