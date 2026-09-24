const jobsData = {
    "65e9f1a2b3c4d5e6f7a8b9c0": [
        "k9x2m4p8q1@yopmail.com",
        "b7v3w9z1n5@yopmail.com",
        "r4t8y2u6i0@yopmail.com",
        "m1o5p9a3s7@yopmail.com",
        "d2f8g4h0j6@yopmail.com",
        "c5v1b9n3m7@yopmail.com",
        "q8w2e6r0t4@yopmail.com",
        "a3s7d1f5g9@yopmail.com",
        "z6x0c4v8b2@yopmail.com",
        "p9o3i7u1y5@yopmail.com"
    ],
    "65e9f1a2b3c4d5e6f7a8b9c1": [
        "f2g6h0j4k8@yopmail.com",
        "l1p5o9i3u7@yopmail.com",
        "y4t8r2e6w0@yopmail.com",
        "q9a3s7d1f5@yopmail.com",
        "g8h2j6k0l4@yopmail.com",
        "m3n7b1v5c9@yopmail.com",
        "x2z6c0v4b8@yopmail.com",
        "n1m5k9j3h7@yopmail.com",
        "g4f8d2s6a0@yopmail.com",
        "p7o1i5u9y3@yopmail.com"
    ],
    "65e9f1a2b3c4d5e6f7a8b9c2": [
        "t8r2e6w0q4@yopmail.com",
        "a9s3d7f1g5@yopmail.com",
        "h2j6k0l4m8@yopmail.com",
        "n3b7v1c5x9@yopmail.com",
        "z2c6v0b4n8@yopmail.com",
        "m1k5j9h3g7@yopmail.com",
        "f4d8s2a6q0@yopmail.com",
        "p9o3i7u1y5@yopmail.com",
        "t2r6e0w4q8@yopmail.com",
        "a1s5d9f3g7@yopmail.com"
    ],
    "65e9f1a2b3c4d5e6f7a8b9c3": [
        "w8e2r6t0y4@yopmail.com",
        "u1i5o9p3a7@yopmail.com",
        "s2d6f0g4h8@yopmail.com",
        "j1k5l9z3x7@yopmail.com",
        "c2v6b0n4m8@yopmail.com",
        "q1w5e9r3t7@yopmail.com",
        "y2u6i0o4p8@yopmail.com",
        "a1s5d9f3g7@yopmail.com",
        "h2j6k0l4z8@yopmail.com",
        "x1c5v9b3n7@yopmail.com"
    ],
    "65e9f1a2b3c4d5e6f7a8b9c4": [
        "m2n6b0v4c8@yopmail.com",
        "x1z5l9k3j7@yopmail.com",
        "h2g6f0d4s8@yopmail.com",
        "a1p5o9i3u7@yopmail.com",
        "y2t6r0e4w8@yopmail.com",
        "q1a5s9d3f7@yopmail.com",
        "g2h6j0k4l8@yopmail.com",
        "z1x5c9v3b7@yopmail.com",
        "n2m6k0j4h8@yopmail.com",
        "g1f5d9s3a7@yopmail.com"
    ]
}

export type jobDataKeyType = keyof typeof jobsData
export type jobDataType = (typeof jobsData)[keyof typeof jobsData]

const getJobEmail = async (id: jobDataKeyType):Promise<jobDataType> => {
    return await new Promise((res,_rej)=>{
        setTimeout(()=>{
           res(jobsData[id])     
        },2000)
    })
}


export { jobsData, getJobEmail }