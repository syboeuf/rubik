import { useState, useEffect } from "react"
import {
    createRubikSCube, movesArray, moveStepOne, moveStepTwo,
    faceConnected, moveStepThree, moveStepFour, moveStepFive,
    moveStepSix, moveStepSeven, facesArray, colorArray,
    moveRightFace, cornersYellow, cornersWhite, newPos,
} from "gameHelpers"
import { useViewer } from "./useViewer"

export const useRubikCube = () => {

    const [cube, setRubikCube] = useState(createRubikSCube())
    const [options, setOption] = useState("")
    const [valueInput, setValueInput] = useState("")
    const [numbersOfMoves, setNumbersOfMoves] = useState(0)
    const [listAllMoves, setListAllMoves] = useState([])
    const [activeButtonStep, setActiveButtonStep] = useState(1)
    const [updateRubikCube] = useViewer()

    useEffect(() => {
        switch (options) {

            case "shuffle":
                shuffleCube()
                setListAllMoves([])
                setNumbersOfMoves(0)
                setActiveButtonStep(1)
                break

            case "resolve":
                resolve()
                break

            case "nbOfMoves":
                alert(numbersOfMoves)
                break

            case "resetMovement":
                setListAllMoves([])
                setNumbersOfMoves(0)
                break

            default:
                setRubikCube(makeMoves(cube, [options]))
                break

        }
        setOption("")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options])

    const resolveStepByStep = (step) => {
        switch (step) {

            case 1:
                stepOne()
                break

            case 2:
                stepTwos()
                break
            
            case 3:
                stepThree()
                break

            case 4:
                stepFour()
                break
            
            case 5:
                stepFive()
                break

            case 6:
                stepSix()
                break

            case 7:
                stepSeven()
                break

            default:
                break

        }
        setActiveButtonStep(step + 1)
    }

    const stepOne = () => {
        let temp = cube.map((face) => (
            face.map((row) => (
                row.map((carre) => (
                    carre
                ))
            ))
        ))
        while (!whiteCross(temp)) {
            temp = makeWhiteCross(temp)
        }
        temp = swapArete(temp)
        setRubikCube(temp)
    }

    const stepTwos = () => {
        let temp = cube.map((face) => (
            face.map((row) => (
                row.map((carre) => (
                    carre
                ))
            ))
        ))
        while (!crowned(temp)) {
            if (!checkCornerWhite(temp)) {
                temp = rearrangeCorner(temp)
            }
            temp = startResolveStepTwo(temp)
        }
        setRubikCube(temp)
    }

    const stepThree = () => {
        let temp = cube.map((face) => (
            face.map((row) => (
                row.map((carre) => (
                    carre
                ))
            ))
        ))
        while (!secondCrowned(temp)) {
            temp = StartAlgoStepThree(temp)
        }
        setRubikCube(temp)
    }

    const stepFour = () => {
        let temp = cube.map((face) => (
            face.map((row) => (
                row.map((carre) => (
                    carre
                ))
            ))
        ))
        while (!yellowCross(temp)) {
            temp = startAlgoStepFour(temp)
        }
        setRubikCube(temp)
    }

    const stepFive = () => {
        let temp = cube.map((face) => (
            face.map((row) => (
                row.map((carre) => (
                    carre
                ))
            ))
        ))
        while (!lastStepArete(temp)) {
            temp = startAlgoStepFive(temp)
        }
        setRubikCube(temp)
    }

    const stepSix = () => {
        let temp = cube.map((face) => (
            face.map((row) => (
                row.map((carre) => (
                    carre
                ))
            ))
        ))
        while (!checkStepSix(temp)) {
            temp = startAlgoStepSix(temp)
        }
        setRubikCube(temp)
    }
    
    const stepSeven = () => {
        let temp = cube.map((face) => (
            face.map((row) => (
                row.map((carre) => (
                    carre
                ))
            ))
        ))
        temp = startAlgoStepSeven(temp)
        setRubikCube(temp)
    }

    // Fin partie test

    const executeMoves = () => {
        if (!valueInput) {
            return
        }
        const moves = valueInput.split(" ")
        for (let i = 0; i < moves.length; i++) {
            const move = movesArray.find((element) => element === moves[i])
            if (!move) {
                alert(`${moves[i]} non reconnu !`)
                return
            }
        }
        let temp = cube.map((face) => (
            face.map((row) => (
                row.map((carre) => (
                    carre
                ))
            ))
        ))
        temp = makeMoves(temp, moves)
        setRubikCube(temp)
    }
    
    // First step

    const resolve = () => {
        let temp = cube.map((face) => (
            face.map((row) => (
                row.map((carre) => (
                    carre
                ))
            ))
        ))
        temp = startResolve(temp)
        while (!crowned(temp)) {
            !checkCornerWhite(temp) && (temp = rearrangeCorner(temp))
            temp = startResolveStepTwo(temp)
        }
        while (!secondCrowned(temp)) {
            temp = StartAlgoStepThree(temp)
        }
        temp = algoStepFour(temp)
        while (!lastStepArete(temp)) {
            temp = startAlgoStepFive(temp)
        }
        while (!checkStepSix(temp)) {
            temp = startAlgoStepSix(temp)
        }
        temp = algoStepSeven(temp)
        setRubikCube(temp)
    }

    const startResolve = (temp) => {
        while (!whiteCross(temp)) {
            temp = makeWhiteCross(temp)
        }
        temp = swapArete(temp)
        return temp
    }

    const makeWhiteCross = (temp) => {
        let moves = []
        const posWhiteCross = ["0_0_1", "0_1_0", "0_1_2", "0_2_1"]
        for (let i = 0; i < posWhiteCross.length; i++) {
            const posCarre = posWhiteCross[i].split("_")
            if (temp[posCarre[0]][posCarre[1]][posCarre[2]] !== "white") {
                for (let j = 1; j < temp.length; j++) {
                    if (temp[j][0][1] === "white") {
                        moves = moveStepOne[j][posWhiteCross[i]][`${j}_0_1`].split(" ")
                        temp = makeMoves(temp, moves)
                    } else if (temp[j][1][0] === "white") {
                        moves = moveStepOne[j][posWhiteCross[i]][`${j}_1_0`].split(" ")
                        temp = makeMoves(temp, moves)
                    } else if (temp[j][1][2] === "white") {
                        moves = moveStepOne[j][posWhiteCross[i]][`${j}_1_2`].split(" ")
                        temp = makeMoves(temp, moves)
                    } else if (temp[j][2][1] === "white") {
                        moves = moveStepOne[j][posWhiteCross[i]][`${j}_2_1`].split(" ")
                        temp = makeMoves(temp, moves)
                    }
                }
            }
        }
        return temp
    }

    const swapArete = (temp) => {
        const pos = [[1, 1, 2], [3, 1, 0], [4, 2, 1], [5, 0, 1]]
        while (!checkLines(temp)) {
            for (let i = 0; i < pos.length; i++) {
                if (temp[pos[i][0]][pos[i][1]][pos[i][2]] !== temp[pos[i][0]][1][1]) {
                    const color = temp[pos[i][0]][pos[i][1]][pos[i][2]]
                    const moves = newPos[pos[i][0]][color].split(" ")
                    temp = makeMoves(temp, moves)
                }
            }
        }
        return temp
    }

    const checkLines = (temp) => {
        if (temp[1][1][2] === temp[1][1][1]
            && temp[3][1][0] === temp[3][1][1]
            && temp[4][2][1] === temp[4][1][1]
            && temp[5][0][1] === temp[5][1][1]
        ) {
            return true
        }
        return false
    }

    const whiteCross = (rubikCube) => {
        if (rubikCube[0][0][1] === "white" && rubikCube[0][1][0] === "white" && rubikCube[0][1][1] === "white"
            && rubikCube[0][1][2] === "white" && rubikCube[0][2][1] === "white") {
            return true
        }
        return false
    }

    // Step two

    const startResolveStepTwo = (temp) => {
        const faces = [1, 2, 4, 3, 5]
        for (let i = 0; i < faces.length; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    if (temp[faces[i]][j][k] === "white") {
                        faceConnected[`T_${faces[i]}_${j}_${k}`] && (temp = stepTwo(temp, `T_${faces[i]}_${j}_${k}`))
                        faceConnected[`D_${faces[i]}_${j}_${k}`] && (temp = stepTwo(temp, `D_${faces[i]}_${j}_${k}`))
                    }
                }
            }
        }
        return temp
    }

    const stepTwo = (temp, locationCarre) => {
        const posCoin = locationCarre.split("_")
        const colorArete = faceConnected[locationCarre][0].split("_")
        const colorAreteTwo = faceConnected[locationCarre][1].split("_")
        const cornerOne = temp[colorArete[0]][colorArete[1]][colorArete[2]]
        const cornerTwo = temp[colorAreteTwo[0]][colorAreteTwo[1]][colorAreteTwo[2]]
        const faceCornerOne = (+colorArete[0] === 2) ? +posCoin[1] : +colorArete[0]
        const move = chooseMove(cornerOne, cornerTwo)
        let arrayMoves = [moveRightFace[temp[move][1][1]][faceCornerOne]]
        let listMoves
        if (posCoin[0] === "T") {
            if (cornerOne === temp[move][1][1] && +colorAreteTwo[0] === 2) {
                listMoves = moveStepTwo.top[`${move}_1_2_3`]
            } else if (cornerTwo === temp[move][1][1] && +posCoin[1] === 2) {
                listMoves = moveStepTwo.top[`${move}_2_3_1`]
            } else {
                listMoves = moveStepTwo.top[`${move}_3_1_2`]
            }
        } else {
            if (cornerOne === temp[move][1][1] && +colorAreteTwo[0] === move) {
                listMoves = moveStepTwo.down[`${move}_1_2_3`]
            } else if (cornerTwo === temp[move][1][1] && +posCoin[1] === move) {
                listMoves = moveStepTwo.down[`${move}_2_3_1`]
            } else {
                listMoves = moveStepTwo.down[`${move}_3_2_1`]
            }
        }
        const moves = arrayMoves.concat(listMoves.split(" "))
        temp = makeMoves(temp, moves)
        return temp
    }

    const rearrangeCorner = (temp) => {
        for (let i = 0; i < cornersWhite.length; i++) {
            const carreOne = faceConnected[cornersWhite[i]][0].split("_")
            const carreTwo = faceConnected[cornersWhite[i]][1].split("_")
            const colorOne = temp[+carreOne[0]][+carreOne[1]][+carreOne[2]]
            const colorTwo = temp[+carreTwo[0]][+carreTwo[1]][+carreTwo[2]]
            const corner = cornersWhite[i].slice(2)
            if (temp[+carreOne[0]][1][1] !== colorOne || temp[+carreTwo[0]][1][1] !== colorTwo) {
                const moves = moveStepTwo.rearrange[corner].split(" ")
                temp = makeMoves(temp, moves)
            }
        }
        return temp
    }

    const checkCornerWhite = (temp) => {
        for (let i = 0; i < cornersWhite.length; i++) {
            const carreOne = faceConnected[cornersWhite[i]][0].split("_")
            const carreTwo = faceConnected[cornersWhite[i]][1].split("_")
            const carreThree = cornersWhite[i].split("_").slice(1)
            if (!checkCorner(temp, carreOne, carreTwo, carreThree)) {
                return false
            }
        }
        return true
    }

    const crowned = (temp) => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (temp[0][i][j] !== "white") {
                    return false
                }
            }
        }
        if (!checkCornerWhite(temp)) {
            return false
        }
        return true
    }

    // Step three

    const StartAlgoStepThree = (temp) => {
        let moves
        for (let k = 0; k < facesArray.length; k++) {
            const { faceCube, i, j, yellow } = facesArray[k]
            const color = colorArray.find((element) => element === temp[faceCube][i][j])
            if (color && temp[2][yellow[0]][yellow[1]] !== "yellow") {
                const firstMove = moveRightFace[color][faceCube]
                temp = updateRubikCube(temp, firstMove)
                switch (firstMove) {

                    case "B":
                        k = (k + facesArray.length - 1) % facesArray.length
                        break

                    case "B'":
                        k = (k + 1) % facesArray.length
                        break

                    case "B2":
                        k = (k + 2) % facesArray.length
                        break

                    case "":
                        break

                    default:
                        break

                }
                const rightFace = (k + 1) % facesArray.length
                const leftFace = (k + facesArray.length - 1) % facesArray.length
                const { face, yellow: y } = moveRightFace[color]
                if (temp[2][y[0]][y[1]] === temp[facesArray[rightFace].faceCube][1][1]) {
                    moves = moveStepThree[`${face}_right`].split(" ")
                } else if (temp[2][y[0]][y[1]] === temp[facesArray[leftFace].faceCube][1][1]) {
                    moves = moveStepThree[`${face}_left`].split(" ")
                }
                break
            }
        }
        if (moves) {
            temp = makeMoves(temp, moves)
        } else {
            temp = noGoodMoves(temp)
        }
        temp = checkWrongPosition(temp)
        return temp
    }

    const noGoodMoves = (temp) => {
        let moves = []
        for (let k = 0; k < facesArray.length; k++) {
            const { faceCube, i, j } = facesArray[k]
            const color = colorArray.find((element) => element === temp[faceCube][i][j])
            if (color) {
                const { face, left, right } = moveRightFace[colorArray[k]]
                const direction = detectRightOrLeft(temp, left, right, face)
                if (direction) {
                    const firstMove = moveRightFace[color][faceCube]
                    moves = [firstMove].concat(moveStepThree[`${face}_${direction}`].split(" "))
                    break
                }
            }
        }
        if (moves.length === 0) {
            for (let k = 0; k < facesArray.length; k++) {
                const { faceCube } = facesArray[k]
                const { face, left, right } = moveRightFace[colorArray[k]]
                const direction = detectRightOrLeft(temp, left, right, face)
                if (direction) {
                    const firstMove = moveRightFace[colorArray[k]][faceCube]
                    moves = [firstMove].concat(moveStepThree[`${face}_${direction}`].split(" "))
                    break
                }
            }
        }
        temp = makeMoves(temp, moves)
        return temp
    }

    const checkWrongPosition = (temp) => {
        for (let i = 0; i < colorArray.length; i++) {
            const { face, right } = moveRightFace[colorArray[i]]
            const { face: secondFace, left } = moveRightFace[colorArray[(i + 1) % colorArray.length]]
            if (temp[face][right[0]][right[1]] === temp[secondFace][1][1] && temp[secondFace][left[0]][left[1]] === temp[face][1][1]) {
                const moves = [].concat(moveStepThree[`${face}_right`].split(" "), "B2", moveStepThree[`${face}_right`].split(" "))
                temp = makeMoves(temp, moves)
            }
        }
        return temp
    }

    const detectRightOrLeft = (temp, left, right, face) => {
        if (temp[face][left[0]][left[1]] !== temp[face][1][1]) {
            return "left"
        }
        if (temp[face][right[0]][right[1]] !== temp[face][1][1]) {
            return "right"
        }
        return false
    }

    const secondCrowned = (temp) => {
        for (let i = 0; i < colorArray.length; i++) {
            const { left, right, face } = moveRightFace[colorArray[i]]
            if (temp[face][left[0]][left[1]] !== temp[face][1][1] || temp[face][1][1] !== temp[face][right[0]][right[1]]) {
                return false
            }
        }
        return true
    }

    // Step four

    const algoStepFour = (temp) => {
        while (!yellowCross(temp)) {
            temp = startAlgoStepFour(temp)
        }
        return temp
    }

    const startAlgoStepFour = (temp) => {
        let firstMove = []
        if (temp[2][0][1] === "yellow" && temp[2][1][0] === "yellow") {
            firstMove.push("B'")
        } else if (temp[2][0][1] === "yellow" && temp[2][1][2] === "yellow") {
            firstMove.push("B2")
        } else if (temp[2][1][2] === "yellow" && temp[2][2][1] === "yellow") {
            firstMove.push("B")
        }
        const moves = firstMove.concat(moveStepFour.split(" "))
        temp = makeMoves(temp, moves)
        return temp
    }

    const yellowCross = (temp) => {
        if (temp[2][0][1] === "yellow" && temp[2][1][0] === "yellow"
            && temp[2][1][2] === "yellow" && temp[2][2][1] === "yellow"
        ) {
            return true
        }
        return false
    }

    // Step five

    const startAlgoStepFive = (temp) => {
        const move = checkFirstCase(temp)
        if (move) {
            temp = updateRubikCube(temp, move)
        } else {
            temp = checkSecondCase(temp)
        }
        return temp
    }

    const selectIndex = (move, k) => {

        switch (move) {

            case "B":
                return (k + facesArray.length - 1) % facesArray.length

            case "B'":
                return (k + 1) % facesArray.length

            case "B2":
                return (k + 2) % facesArray.length

            default:
                return k

        }

    }

    const checkFirstCase = (temp) => {
        const listMoves = ["B", "B'", "B2"]
        for (let m = 0; m < listMoves.length; m++) {
            let count = 0
            for (let k = 0; k < facesArray.length; k++) {
                const { faceCube, i, j } = facesArray[k]
                const { faceCube: prevFaceCube } = facesArray[selectIndex(listMoves[m], k)]
                temp[faceCube][i][j] === temp[prevFaceCube][1][1] && count++
            }
            if (count === facesArray.length) {
                return listMoves[m]
            }
        }
        return
    }

    const checkSecondCase = (temp) => {
        let count
        while (count !== 2) {
            count = 0
            for (let k = 0; k < facesArray.length; k++) {
                const { faceCube, i, j } = facesArray[k]
                temp[faceCube][i][j] !== temp[faceCube][1][1] && count++
            }
            count !== 2 && (temp = updateRubikCube(temp, "B"))
        }
        let moves
        if (inversePosition(temp)) {
            for (let k = 0; k < facesArray.length; k++) {
                const { faceCube, i, j } = facesArray[k]
                const { faceCube: secondFace, i: secondI, j: secondJ } = facesArray[(k + 2) % facesArray.length]
                if (temp[faceCube][i][j] === temp[secondFace][1][1] && temp[secondFace][secondI][secondJ] === temp[faceCube][1][1]) {
                    // make a slice instead a splice
                    moves = moveStepFive[faceCube].split(" ")
                    const test = moves.splice(moves.length - 1, 1)
                    temp = makeMoves(temp, moves)
                    break
                }
            }
        }
        for (let k = 0; k < facesArray.length; k++) {
            const { faceCube, i, j } = facesArray[k]
            const { faceCube: secondFace, i: secondI, j: secondJ } = facesArray[(k + 1) % facesArray.length]
            const { faceCube: thirdFace } = facesArray[(k + facesArray.length - 1) % facesArray.length]
            if (temp[secondFace][secondI][secondJ] === temp[secondFace][1][1] && temp[faceCube][i][j] === temp[thirdFace][1][1]) {
                moves = moveStepFive[faceCube].split(" ")
                temp = makeMoves(temp, moves)
            }
        }
        return temp
    }

    const inversePosition = (temp) => {
        for (let k = 0; k < facesArray.length; k++) {
            const { faceCube, i, j } = facesArray[k]
            const {
                faceCube: secondFace, i: secondI, j: secondJ,
            } = facesArray[(k + 2) % facesArray.length]
            if (temp[faceCube][i][j] === temp[faceCube][1][1] && temp[secondFace][secondI][secondJ] === temp[secondFace][1][1]) {
                return true
            }
        }
        return false
    }

    const lastStepArete = (temp) => {
        for (let k = 0; k < facesArray.length; k++) {
            const { faceCube, i, j } = facesArray[k]
            if (temp[faceCube][i][j] !== temp[faceCube][1][1]) {
                return false
            }
        }
        return true
    }

    // Step six

    const startAlgoStepSix = (temp) => {
        let colorOne
        let colorTwo
        for (let i = 0; i < cornersYellow.length; i++) {
            const carreOne = faceConnected[`T_${cornersYellow[i]}`][0].split("_")
            const carreTwo = faceConnected[`T_${cornersYellow[i]}`][1].split("_")
            const carreThree = cornersYellow[i].split("_")
            if (checkCorner(temp, carreOne, carreTwo, carreThree)) {
                if (temp[+carreOne[0]][+carreOne[1]][+carreOne[2]] === "yellow") {
                    colorOne = temp[+carreTwo[0]][+carreTwo[1]][+carreTwo[2]]
                    colorTwo = temp[+carreThree[0]][+carreThree[1]][+carreThree[2]]
                } else if (temp[+carreTwo[0]][+carreTwo[1]][+carreTwo[2]] === "yellow") {
                    colorOne = temp[+carreOne[0]][+carreOne[1]][+carreOne[2]]
                    colorTwo = temp[+carreThree[0]][+carreThree[1]][+carreThree[2]]
                } else {
                    colorOne = temp[+carreTwo[0]][+carreTwo[1]][+carreTwo[2]]
                    colorTwo = temp[+carreOne[0]][+carreOne[1]][+carreOne[2]]
                }
                break
            }
        }
        let moves
        if (colorOne && colorTwo) {
            const face = chooseMove(colorOne, colorTwo)
            moves = moveStepSix[face].split(" ")
        } else {
            moves = moveStepSix["1"].split(" ")
        }
        temp = makeMoves(temp, moves)
        return temp
    }

    const checkStepSix = (temp) => {
        for (let k = 0; k < cornersYellow.length; k++) {
            const carreOne = faceConnected[`T_${cornersYellow[k]}`][0].split("_")
            const carreTwo = faceConnected[`T_${cornersYellow[k]}`][1].split("_")
            const carreThree = cornersYellow[k].split("_")
            if (!checkCorner(temp, carreOne, carreTwo, carreThree)) {
                return false
            }
        }
        return true
    }

    // Step seven

    const algoStepSeven = (temp) => {
        temp = startAlgoStepSeven(temp)
        return temp
    }

    const startAlgoStepSeven = (temp) => {
        let face
        let i = 0
        for (; i < cornersYellow.length; i++) {
            const carre = cornersYellow[i].split("_")
            if (!checkFaceYellow(temp, carre)) {
                face = cornersYellow[i]
                break
            }
        }
        !face && (face = cornersYellow[0])
        while (!checkStepSeven(temp)) {
            const carre = cornersYellow[i].split("_")
            while (!checkFaceYellow(temp, carre)) {
                const moves = moveStepSeven[face].split(" ")
                temp = makeMoves(temp, moves)
            }
            temp = updateRubikCube(temp, "B")
        }
        return temp
    }

    const checkFaceYellow = (temp, carre) => {
        const color = temp[+carre[0]][+carre[1]][+carre[2]]
        if (color === temp[2][1][1]) {
            return true
        }
        return false
    }

    const checkStepSeven = (temp) => {
        for (let i = 0; i < temp.length; i++) {
            const color = temp[i][1][1]
            for (let j = 0; j < temp[i].length; j++) {
                for (let k = 0; k < temp[i][j].length; k++) {
                    if (temp[i][j][k] !== color) {
                        return false
                    }
                }
            }
        }
        return true
    }

    // General

    const chooseMove = (cornerOne, cornerTwo) => {
        if ((cornerOne === "green" && cornerTwo === "red") || (cornerOne === "red" && cornerTwo === "green")) {
            return 5
        } else if ((cornerOne === "blue" && cornerTwo === "red") || (cornerOne === "red" && cornerTwo === "blue")) {
            return 3
        } else if ((cornerOne === "green" && cornerTwo === "orange") || (cornerOne === "orange" && cornerTwo === "green")) {
            return 1
        } else if ((cornerOne === "orange" && cornerTwo === "blue") || (cornerOne === "blue" && cornerTwo === "orange")) {
            return 4
        }
    }

    const checkCorner = (temp, carreOne, carreTwo, carreThree) => {
        let colorCornerArray = [
            temp[+carreOne[0]][+carreOne[1]][+carreOne[2]],
            temp[+carreTwo[0]][+carreTwo[1]][+carreTwo[2]],
            temp[+carreThree[0]][+carreThree[1]][+carreThree[2]],
        ]
        const cornerFace = [+carreOne[0], +carreTwo[0], +carreThree[0]]
        for (let i = 0; i < cornerFace.length; i++) {
            for (let j = 0; j < colorCornerArray.length; j++) {
                if (temp[cornerFace[i]][1][1] === colorCornerArray[j]) {
                    colorCornerArray = colorCornerArray.filter((element) => element !== colorCornerArray[j])
                    break
                }
            }
        }
        if (colorCornerArray.length === 0) {
            return true
        }
        return false
    }

    const makeMoves = (temp, moves) => {
        moves.forEach((move) => {
            temp = updateRubikCube(temp, move)
            setNumbersOfMoves((prevState) => (move) ? prevState + 1 : prevState)
            setListAllMoves((prevState) => (move) ? [...prevState, move] : [...prevState])
        })
        return temp
    }

    const shuffleCube = () => {
        const randomMovesArray = []
            for (let i = 0; i < 30; i++) {
                const randomNum = Math.floor(Math.random() * movesArray.length)
                randomMovesArray.push(movesArray[randomNum])
            }
            for (let i = 0; i < randomMovesArray.length; i++) {
                setRubikCube((prevState) => updateRubikCube(prevState, randomMovesArray[i]))
            }
    }

    return [cube, setOption, valueInput, setValueInput, executeMoves, activeButtonStep, resolveStepByStep, listAllMoves]

}