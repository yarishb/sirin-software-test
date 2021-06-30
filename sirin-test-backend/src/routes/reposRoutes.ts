import { ReposService } from '../services/reposServices/reposServices'

const router = require('express').Router()

const repos: ReposService = new ReposService()

//add repos
router.post('/addRepos', repos.addRepo.bind(repos))

//get all users repos
router.get('/getUsersRepos', repos.getUserRepos.bind(repos))

//delete repo
router.delete('/deleteRepo', repos.deleteRepo.bind(repos))

//update repo
router.put('/updateRepo', repos.updateRepoToNewDataFromAPI.bind(repos))

module.exports = router
