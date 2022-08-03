import React from 'react'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

export interface Youtube {
    id: string;
    title: string;
    subtitle: string;
    avatar_image: string;
    youtube_image: string;
}

export interface Data {
    youtubes: Youtube[];
    error: boolean;
    error_msg: string;
}

type Props = {
    data: Data;
}

export default function index({ data }: Props) {
    const { youtubes } = data

    return (
        <div>
            <h1>Test TypeScript</h1>
            <ul>
                {youtubes && youtubes.length > 0 && youtubes.map((item) => (
                    <li key={item.id}>
                        <div>{item.title}</div>
                        <span style={{color: 'gray'}}>{item.subtitle}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const url = "http://codemobiles.com/adhoc/youtubes/index_new.php?username=admin&password=password&type=foods";
    const res = await fetch(url);
    const result = await res.json();
    const data: Data = result;

    return {
        props: {
            data,
        }
    }
}