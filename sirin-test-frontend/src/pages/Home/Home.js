import React from 'react'
import Search from '../../components/partComponents/Search/Search'
import styles from './Home.module.scss'
import Repositories from '../../components/usedComponents/Repositores/Repositories'
const Home = () => {
    return (
        <>
            <div className={styles.home}>
                <Search />
            </div>
            <div className={styles.repositories}>
                <Repositories />
            </div>
        </>
    )
}

export default Home
