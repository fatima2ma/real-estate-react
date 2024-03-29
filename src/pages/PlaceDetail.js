import { useState, useContext, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import SectionWrraper from '../components/SectionWrraper';
import CardDetails from '../components/CardDetails';
import Slider from '../components/Slider';
import SectionLoading from '../components/SectionLoading';
import LoadingWrapp from '../components/LoadingWrapp';
import Loading from '../components/Loading';
import ItemContext from '../context/ItemContext';

function PlaceDetail(){    
    const param = useParams();
    const {placeData, loading, fetchItem} = useContext(ItemContext);

    useEffect(() => {
        param.id && !placeData.length && fetchItem(param.id);
    }, [param.id]);

    const [tree, setTree] = useState({
        title: 'squareThumb',
        thumbnail: false,
        header: true,
        body: {
            type: 'list',
            title: true,
            items: 3,
        },
        subTitle: {
            type: 'subTitle',
            items: 3,
        },
        breakline: true,
    });

    const [Titletree, setTitleTree] = useState({
        title: 'titleTree',
        header: true,
        body: {
            type: 'list',
            title: false,
            items: 1,
        },
    });
    
    return(
        <>
        {loading? (
            <SectionWrraper classStyle='shadow'>
                <SectionLoading>
                    <LoadingWrapp className={`${Titletree.title} LoadingWrapp`}><Loading tree={Titletree}/></LoadingWrapp>
                </SectionLoading>
                <SectionLoading>
                    <LoadingWrapp className={`${tree.title} LoadingWrapp`}><Loading tree={tree}/></LoadingWrapp>                     
                </SectionLoading>
            </SectionWrraper>)
            :(<>
                <Slider data={placeData.imagesURLs} sharedIcon={true}/>
                <SectionWrraper classStyle='shadow'>
                    <CardDetails data={placeData}></CardDetails>
                </SectionWrraper>
            </>)
        }
        </>
    )
};

export default PlaceDetail;