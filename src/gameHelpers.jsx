const rubikSCubeFace = ["white", "green", "yellow", "blue", "orange", "red"]

export const createRubikSCube = () => {
    const rubikCube = []
    for (let i = 0; i < rubikSCubeFace.length; i++) {
        const face = []
        for (let j = 0; j < 3; j++) {
            const row = []
            for (let k = 0; k < 3; k++) {
                row.push(rubikSCubeFace[i])
            }
            face.push(row)
        }
        rubikCube.push(face)
    }
    return rubikCube
}

export const facesArray = [
    { faceCube: 1, i: 1, j: 0, yellow: [1, 2] },
    { faceCube: 4, i: 0, j: 1, yellow: [0, 1] },
    { faceCube: 3, i: 1, j: 2, yellow: [1, 0] },
    { faceCube: 5, i: 2, j: 1, yellow: [2, 1] },
]

export const colorArray = ["green", "orange", "blue", "red"]

export const cornersYellow = ["2_0_0", "2_0_2", "2_2_0", "2_2_2"]

export const cornersWhite = ["T_0_0_0", "T_0_0_2", "D_0_2_0", "D_0_2_2"]

export const moveRightFace = {
    green: { face: 1, yellow: [1, 2], left: [2, 1], right: [0, 1], 1: "", 3: "B2", 4: "B", 5: "B'" },
    blue: { face: 3, yellow: [1, 0], left: [0, 1], right: [2, 1], 1: "B2", 4: "B'", 3: "", 5: "B" },
    orange: { face: 4, yellow: [0, 1], left: [1, 0], right: [1, 2], 1: "B'", 4: "", 3: "B", 5: "B2" },
    red: { face: 5, yellow: [2, 1], left: [1, 2], right: [1, 0], 1: "B", 3: "B'", 4: "B2", 5: "" },
}

export const newPos = {
    1: {
        blue: "R2 B2 L2 B2 R2",
        orange: "U2 B L2 B' U2",
        red: "D2 B' L2 B D2",
    },
    3: {
        green: "L2 B2 R2 B2 L2",
        orange: "U2 B' R2 B U2",
        red: "D2 B R2 B' D2",
    },
    4: {
        green: "L2 B' U2 B L2",
        blue: "R2 B U2 B' R2",
        red: "D2 B2 U2 B2 D2",
    },
    5: {
        green: "L2 B D2 B' L2",
        blue: "R2 B' D2 B R2",
        orange: "U2 B2 D2 B2 U2",
    },
}

export const movesArray = [
    "U", "U'", "U2", "F", "F'", "F2", "R", "R'", "R2", "B", "B'", "B2", "L", "L'", "L2", "D", "D'", "D2",
]

export const moveStepOne = {
    1: {
        "0_0_1": {
            "1_0_1": "U'",
            "1_1_0": "F U' F'",
            "1_1_2": "F' U' F",
            "1_2_1": "F2 U' F2",
        },
        "0_1_0": {
            "1_0_1": "F U' F'",
            "1_1_0": "F L U' L' F'",
            "1_1_2": "F' D' F L'",
            "1_2_1": "F' D F",
        },
        "0_1_2": {
            "1_0_1": "F' U' F",
            "1_1_0": "L F' U' F L'",
            "1_1_2": "L' F' U' F L",
            "1_2_1": "F D F'",
        },
        "0_2_1": {
            "1_0_1": "L2 D L2",
            "1_1_0": "L' D L",
            "1_1_2": "L D L'",
            "1_2_1": "D",
        },
    },
    2: {
        "0_0_1": {
            "2_0_1": "U2",
            "2_1_0": "B U2",
            "2_1_2": "B' U2",
            "2_2_1": "B2 U2",
        },
        "0_1_0": {
            "2_0_1": "B L2",
            "2_1_0": "B2 L2",
            "2_1_2": "L2",
            "2_2_1": "B' L2",
        },
        "0_1_2": {
            "2_0_1": "B' R2",
            "2_1_0": "R2",
            "2_1_2": "B2 R2",
            "2_2_1": "B R2",
        },
        "0_2_1": {
            "2_0_1": "B2 D2",
            "2_1_0": "B' D2",
            "2_1_2": "B D2",
            "2_2_1": "D2",
        },
    },
    3: {
        "0_0_1": {
            "3_0_1": "U",
            "3_1_0": "R U R'",
            "3_1_2": "R' U R",
            "3_2_1": "R2 U R2",
        },
        "0_1_0": {
            "3_0_1": "F U F'",
            "3_1_0": "R F U F' R'",
            "3_1_2": "R' F U F' R",
            "3_2_1": "R2 F U F' R2",
        },
        "0_1_2": {
            "3_0_1": "F' U F",
            "3_1_0": "F D F' R",
            "3_1_2": "F' R' U R F",
            "3_2_1": "F D' F'",
        },
        "0_2_1": {
            "3_0_1": "F2 U F2",
            "3_1_0": "R' D' R",
            "3_1_2": "R D' R'",
            "3_2_1": "D'",
        },
    },
    4: {
        "0_0_1": {
            "4_0_1": "F U R' U' F'",
            "4_1_0": "B U2 B",
            "4_1_2": "F R' F'",
            "4_2_1": "U' F R' F'",
        },
        "0_1_0": {
            "4_0_1": "U' L U",
            "4_1_0": "L",
            "4_1_2": "U2 L U2",
            "4_2_1": "U F L F' U'",
        },
        "0_1_2": {
            "4_0_1": "U R' U'",
            "4_1_0": "F2 R' F2",
            "4_1_2": "R'",
            "4_2_1": "U' R' U",
        },
        "0_2_1": {
            "4_0_1": "U' F' R' F U",
            "4_1_0": "F L F'",
            "4_1_2": "F' R' F",
            "4_2_1": "U F L F' U'",
        },
    },
    5: {
        "0_0_1": {
            "5_0_1": "D' F' L' F D",
            "5_1_0": "F' L' F",
            "5_1_2": "F R F'",
            "5_2_1": "F D' R D F'",
        },
        "0_1_0": {
            "5_0_1": "D' L' D",
            "5_1_0": "L'",
            "5_1_2": "D2 L' D2",
            "5_2_1": "D L' D'",
        },
        "0_1_2": {
            "5_0_1": "D R D'",
            "5_1_0": "D2 R D3",
            "5_1_2": "R",
            "5_2_1": "D' R D",
        },
        "0_2_1": {
            "5_0_1": "D' F L' F'",
            "5_1_0": "F L' F'",
            "5_1_2": "F' R F",
            "5_2_1": "F D L' D' F'",
        },
    },
}

export const moveStepTwo = {
    top: {
        "1_1_2_3": "U B U'",
        "3_1_2_3": "D B D'",
        "4_1_2_3": "R B R'",
        "5_1_2_3": "L B L'",
        "1_2_3_1": "B U B' U' B U B' U' B U B' U'",
        "3_2_3_1": "B D B' D' B D B' D' B D B' D'",
        "4_2_3_1": "B R B' R' B R B' R' B R B' R'",
        "5_2_3_1": "B L B' L' B L B' L' B L B' L'",
        "1_3_1_2": "L' B' L",
        "3_3_1_2": "R' B' R",
        "4_3_1_2": "U' B' U",
        "5_3_1_2": "D' B' D",
    },
    down: {
        "1_1_2_3": "U B U' B' U B U'",
        "3_1_2_3": "D B D' B' D B D'",
        "4_1_2_3": "R B R' B' R B R'",
        "5_1_2_3": "L B L' B' L B L'",
        "1_2_3_1": "U B' U' B U B' U'",
        "3_2_3_1": "D B' D' B D B' D'",
        "4_2_3_1": "R B' R' B R B' R'",
        "5_2_3_1": "L B' L' B L B' L'",
        "1_3_2_1": "L' B L",
        "3_3_2_1": "R' B R",
        "4_3_2_1": "U' B U",
        "5_3_2_1": "D' B D",
    },
    rearrange: {
        "0_0_0": "U B U'",
        "0_0_2": "U' B U",
        "0_2_0": "D' B D",
        "0_2_2": "D B D'",
    },
}

export const moveStepThree = {
    "1_left": "B' D' B D B L B' L'",
    "4_left": "B' L' B L B U B' U'",
    "3_left": "B' U' B U B R B' R'",
    "5_left": "B' R' B R B D B' D'",
    "1_right": "B U B' U' B' L' B L",
    "4_right": "B R B' R' B' U' B U",
    "3_right": "B D B' D' B' R' B R",
    "5_right": "B L B' L' B' D' B D",
}

export const moveStepFour = "L U B U' B' L'"

export const moveStepFive = {
    1: "U B U' B U B2 U' B",
    3: "D B D' B D B2 D' B",
    4: "R B R' B R B2 R' B",
    5: "L B L' B L B2 L' B",
}

export const moveStepSix = {
    1: "B U B' D' B U' B' D",
    3: "B D B' U' B D' B' U",
    4: "B R B' L' B R' B' L",
    5: "B L B' R' B L' B' R",
}

export const moveStepSeven = {
    "2_0_0": "R' F R F'",
    "2_0_2": "U' F U F'",
    "2_2_0": "D' F D F'",
    "2_2_2": "L' F L F'",
}

export const faceConnected = {
    "T_0_0_0": ["1_0_2", "4_2_0"],
    "T_0_0_2": ["4_2_2", "3_0_0"],
    "D_0_2_0": ["5_0_0", "1_2_2"],
    "D_0_2_2": ["3_2_0", "5_0_2"],
    "T_1_0_0": ["2_0_2", "4_0_0"],
    "D_1_0_2": ["0_0_0", "4_2_0"],
    "T_1_2_0": ["5_2_0", "2_2_2"],
    "D_1_2_2": ["0_2_0", "5_0_0"],
    "T_2_0_0": ["4_0_2", "3_0_2"],
    "T_2_0_2": ["1_0_0", "4_0_0"],
    "T_2_2_0": ["3_2_2", "5_2_2"],
    "T_2_2_2": ["1_2_0", "5_2_0"],
    "D_3_0_0": ["0_0_2", "4_2_2"],
    "T_3_0_2": ["4_0_2", "2_0_0"],
    "D_3_2_0": ["0_2_2", "5_0_2"],
    "T_3_2_2": ["2_2_0", "5_2_2"],
    "T_4_0_0": ["1_0_0", "2_0_2"],
    "T_4_0_2": ["2_0_0", "3_0_2"],
    "D_4_2_0": ["0_0_0", "1_0_2"],
    "D_4_2_2": ["0_0_2", "3_0_0"],
    "D_5_0_0": ["0_2_0", "1_2_2"],
    "D_5_0_2": ["0_2_2", "3_2_0"],
    "T_5_2_0": ["1_2_0", "2_2_2"],
    "T_5_2_2": ["3_2_2", "2_2_0"],
}