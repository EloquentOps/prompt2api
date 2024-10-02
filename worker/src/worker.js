import { config } from 'dotenv';
config();


const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Content-Type': 'application/json',
}

const resGen = m => {
	const r = typeof m === 'object' ? JSON.stringify(m) : m
	return new Response(r, {headers})
}

addEventListener("fetch", (event) => {
  event.respondWith(
		handleRequest(event.request, event).catch(
			(err) => new Response(err.stack, { status: 500, headers })
		))
})

const sys = `
	You are an API Generator.
	You try to interpret the user request and generate an API response matching the user request.
	If the user provides information about the schema, you use that information to generate the schema response.
	In general, the data values are up to you, unless the user provides information about how to generate the values.
	Return a JSON payload as requested by the user following this format: {"result": <result>}.
`

async function handleRequest(request, event) {
	if (request.method === 'OPTIONS') return resGen('')

	const url = new URL(request.url)
	const { pathname } = url || {}
	const path = pathname.replace('/', '')

	if(pathname.indexOf('favicon') >= 0) return resGen('')



	if(request.method === 'GET'){
		if(path.indexOf('u/') >= 0){
			try {
				const val = path.split('u/')[1]
				const res = await prompt_api_kv.get(val)
				return new Response(res, {headers:{
					...headers,
					'Access-Control-Allow-Methods': 'GET,OPTIONS',
					'Cache-Control':'max-age=31536000'}})
			} catch (error) {
				return resGen({error:true, message:error.message})
			}
		}
	}



	if(request.method === 'POST'){

		const openAIKey = request.headers.get("Authorization") || ''
		if(!openAIKey) return resGen('No OpenAI key')

		if(path === 'publish'){
			try {
				const body = await request.json()
				const { output } = body || {}
				const { result, question, total_tokens } = output || {}
				const key = crypto.randomUUID()
				await prompt_api_kv.put(key, JSON.stringify(result))

				return resGen({key})
			} catch (error) {
				return resGen(error.message)
			}
		}

		if(path === 'generate'){
			try {

				const body = await request.json()
				const { question } = body || {}

				const aiRes = await fetch(OPENAI_BASEURL, {
					method:'POST',
					body: JSON.stringify({
						model: "gpt-4o-mini",
						response_format: {type: "json_object"},
						temperature: 0.5,
						messages: [
								{role: "system", content: sys},
								{role: "user", content: question}
						]
					}),
					headers:{
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + openAIKey
					}
				})

				const aiJson = await aiRes.json()
				const { choices, usage } = aiJson || {}
				const { total_tokens } = usage || {}
				const { message } = choices[0] || {}
				const { content } = message || {}
				const json = JSON.parse(content)

				return resGen({...json, question, total_tokens})
			} catch (error) {
				return resGen(error.message)
			}
		}
	}

	return resGen('')
}
