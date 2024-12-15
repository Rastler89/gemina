import { useParams } from "react-router-dom";

const CastDetail = () => {
    const {castId} = useParams();

    return (
        <>
            Item {castId}
        </>
    )
}

export default CastDetail;