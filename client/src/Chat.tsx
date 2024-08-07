import React, { useState, useEffect } from "react"
import { PrivateKeyAccount } from "viem"

import { ChatInstance } from "./ChatInstance.js"

export type Message = {
	id: "string"
	content: "string"
	address: "string"
	timestamp: "number"
}

type PeerId = any // TODO

export const Chat = ({ account }: { account: PrivateKeyAccount }) => {
	const [rooms, setRooms] = useState<string[]>([])
	const [prefix, setPrefix] = useState("room")

	const [onlinePeers, setOnlinePeers] = useState<Record<string, PeerId>>({})

	// useEffect(() => {
	// 	const handlePresenceChange = ({
	// 		detail: { peers },
	// 	}: CanvasEvents["presence:join"] | CanvasEvents["presence:leave"]) => {
	// 		const onlinePeers: Record<string, PeerId> = {} // TODO: re-export PeerId
	// 		for (const { peerId, env, lastSeen, topics } of Object.values(peers)) {
	// 			if (env !== "browser") continue
	// 			for (const topic of topics) {
	// 				if (topic.startsWith("canvas/" + prefix)) {
	// 					if (onlinePeers[topic] === undefined) onlinePeers[topic] = []
	// 					onlinePeers[topic].push(peerId)
	// 				}
	// 			}
	// 		}
	// 		setOnlinePeers(onlinePeers)
	// 	}

	// 	app?.addEventListener("presence:join", handlePresenceChange)
	// 	app?.addEventListener("presence:leave", handlePresenceChange)
	// 	return () => {
	// 		app?.removeEventListener("presence:join", handlePresenceChange)
	// 		app?.removeEventListener("presence:leave", handlePresenceChange)
	// 	}
	// }, [app])

	return (
		<>
			<input
				type="text"
				placeholder="prefix"
				value={prefix}
				onChange={(e) => {
					setPrefix(e.target.value)
				}}
				style={{ position: "fixed", top: 20, right: 130 }}
			/>
			{new Array(...Array(20)).map((unused, index) => {
				const numOnline = onlinePeers[`canvas/${prefix}-${index + 1}.xyz`]?.length
				return (
					<button
						key={index}
						style={{
							position: "fixed",
							top: 20 + index * 35,
							right: 20,
						}}
						onClick={() => {
							const room = `${prefix}-${index + 1}.xyz`
							if (rooms.indexOf(room) !== -1) return
							setRooms([...rooms, room])
						}}
					>
						Join room {index + 1} {numOnline && `(${numOnline} here)`}
					</button>
				)
			})}
			{rooms.map((room, index) => (
				<ChatInstance key={room} topic={room} left={30 + index * 300} account={account} />
			))}
		</>
	)
}
