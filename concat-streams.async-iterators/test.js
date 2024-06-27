import axios from 'axios';
import { error, log } from 'console';
import { writeFileSync } from 'fs';
import { Writable } from 'stream';
import { pipeline } from   'stream/promises';

const API_1 = 'http://localhost:3005';
const API_2 = 'http://localhost:4000';
const API_CATALAGO = 'http://localhost:3003/api/v1/movie'
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsImFjdGl2YXRlZCI6dHJ1ZSwiY3JlYXRlZEF0IjoiMjAyNC0wNi0wNVQyMDowMTo1My45MDZaIiwidXBkYXRlZEF0IjoiMjAyNC0wNi0wNVQyMDowMTo1My45MDZaIn0sImlhdCI6MTcxODc2MTc2MiwiZXhwIjoxNzE4NzY1MzYyfQ.xb5PdeciD3TVzrS4pGhlXNeNQ5yenkcOdXkofoqLh0Q'


axios({
                method: 'get',
                url: API_CATALAGO,
                responseType: 'json',
                headers: {
                    'Authorization': token
                },
            }).then(({data}) => {
                writeFileSync('data.json',JSON.stringify(data))
            }).catch(error => log(error.message))