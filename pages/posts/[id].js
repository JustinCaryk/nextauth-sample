import Layout from '../../components/layout'
import {
    getAllPostIds,
    getPostData
} from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { useSession } from 'next-auth/client'

export default function Post({ postData }) {
    const [ session, loading ] = useSession()
    
    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    if (!session) {
        return (
            <div>Not signed in</div>
        )
    }
    if (session.user.email) {
        return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            {postData.title}
            <br />
            {postData.id}
            <br />
            <Date dateString={postData.date} />
            <br/>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </Layout>
        )
    }
}
  

export async function getStaticProps({
    params
}) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}