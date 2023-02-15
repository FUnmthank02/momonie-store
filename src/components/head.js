import Head from "next/head"
import { memo } from "react"


function HeadComp(props) {

    return (
        <>
            <Head>
                <title>{props.title}</title>
                <meta name="description" content={props.title} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </>
    )
}

export default memo(HeadComp)