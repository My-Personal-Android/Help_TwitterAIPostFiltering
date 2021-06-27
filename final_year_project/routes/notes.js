const router = require('express').Router()
const axios = require('axios')
const {spawn} = require('child_process');
var fs = require('fs');



// define the default route that fetches all of our notes


router.post('/', async function (req, res) {

    // data the conserves our API quota for development
	console.log("hello i am called",req.body);
    // add a line to a lyric file, using appendFile
fs.appendFile('storelink.txt', '\nLink->'+req.body, (err) => {
    if (err) throw err;
    console.log('The lyrics were updated!');
});
    var dataToSend;
//  spawn new child process to call the python script
 const python = spawn('python', ['doAnalysis.py']);
//  collect data from script
 python.stdout.on('data', function (data) {
  console.log('Pipe data from python script ...');
  dataToSend = data.toString();
  
 })
//  in close event we are sure that stream from child process is closed
 python.on('close', (code) => {
 console.log(`child process close all stdio with code ${code}`);
 // send data to browser
 

try {  
    var data = fs.readFileSync('Data.txt', 'utf8');
    console.log(data.toString());    
} catch(e) {
    console.log('Error:', e.stack);
}
 console.log(data);
	res.send(data)
	});
	
	
})
router.post('/delete', async function (req, res) {
    // extract the note id to delete from request body
    const { noteId } = req.body

    console.log(noteId)

    try {
        // add api call

        res.send('Note deleted')
    } catch (e) {
        console.log(e)
        res.status(500).send('Error.')
    }
})

module.exports = router


 
 
// router.use(bodyParser.json()); 
// router.use(bodyParser.urlencoded({ extended: true })); 
 
// app.post('/postdata', (req, res) => { 
// 	var data = req.body.data; // your data 
//     // do something with that data (write to a DB, for instance) 
// 	res.status(200).json({ 
// 		message: "Data received successfully" 
// 	}); 
// }); 
// module.exports = router
