import React, { useEffect } from 'react'
import styles from './Repositories.module.scss'
import { connect } from 'react-redux'
import { deleteRepo, getAllRepos, updateRepo } from '../../../store/actions/repos'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const Repositories = ({ repos, getAllRepos, deleteRepo, updateRepo }) => {
    useEffect(() => {
        if (!repos.length) {
            getAllRepos()
        }
    }, [])

    return (
        <>
            {repos.map((el, idx) => {
                return (
                    <Card key={idx} style={{ width: '40rem' }}>
                        <CardActionArea>
                            <div className={styles.owner}>
                                <img src={el.project_owner_avatar} title="Contemplative Reptile" alt={'avatar'} className={styles.owner__img} />
                                <div className={styles.owner__name}>{el.project_owner}</div>
                                <a href={el.project_owner_url} className={styles.owner__url}>
                                    {el.project_owner_url}
                                </a>
                            </div>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {el.project_name}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="h2"></Typography>
                                <Typography variant="body2" color="textSecondary" component="div" className={styles.statisticsBox}>
                                    <div className={styles.statisticsBox__statistics}>stars: {el.count_of_stars}</div>
                                    <div className={styles.statisticsBox__statistics}>forks: {el.count_of_forks}</div>
                                    <div className={styles.statisticsBox__statistics}>issues: {el.count_of_issues}</div>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: '1rem' }}>
                                    created at: {el.created_at}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: '1rem' }}>
                                    project url: <a href={el.project_url}>{el.project_url}</a>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button onClick={() => updateRepo(el)} size="small" color="primary">
                                Змінити
                            </Button>
                            <Button onClick={() => deleteRepo(el.id)} size="small" color="primary">
                                Видалити
                            </Button>
                        </CardActions>
                    </Card>
                )
            })}
        </>
    )
}

const mapStateToProps = (state) => ({
    repos: state.repos.repos
})
export default connect(mapStateToProps, { getAllRepos, deleteRepo, updateRepo })(Repositories)
