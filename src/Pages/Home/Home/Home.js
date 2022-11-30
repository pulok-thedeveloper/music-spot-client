import Categories from '../../../components/Categories/Categories';
import AdvertiseProducts from '../../AdvertiseProducts/AdvertiseProducts';

import Banner from '../Banner/Banner';
import Subscribe from '../Subscribe/Subscribe';

const Home = () => {

    return (
        <div>
            <Categories></Categories>
            <Banner></Banner>
            <AdvertiseProducts></AdvertiseProducts>
            <Subscribe></Subscribe>
        </div>

    )
};

export default Home;