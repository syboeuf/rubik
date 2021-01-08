export const useViewer = () => {
  const rotateFaceCube = (temp, faceCube, des, rubikCube) => {
    let { face, i, j, increase, one, two } = faceCube;
    for (let k = 0; k < 3; k++) {
      temp[des - 1][i][one > -1 ? one : k] =
        rubikCube[face - 1][j][two > -1 ? two : k];
      increase.indexOf("j+") > -1 && j++;
      increase.indexOf("j-") > -1 && j--;
      increase.indexOf("i+") > -1 && i++;
      increase.indexOf("i-") > -1 && i--;
    }
    return temp;
  };

  const startSimpleMove = (temp, faceCube, rubikCube) => {
    for (let i = 0; i < faceCube.length; i++) {
      temp = rotateFaceCube(
        temp,
        faceCube[i],
        faceCube[(i + 1) % faceCube.length].face,
        rubikCube
      );
    }
    return temp;
  };

  const moveFaceLeft = (temp, face, rubikCube) => {
    for (let i = 0, m = 2; i < 3; i++, m--) {
      for (let j = 2; j >= 0; j--) {
        temp[face][m][j] = rubikCube[face][j][i];
      }
    }
    return temp;
  };

  const moveFaceRight = (temp, face, rubikCube) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 2, k = 0; j >= 0; j--, k++) {
        temp[face][i][k] = rubikCube[face][j][i];
      }
    }
    return temp;
  };

  const doubleMove = (temp, face, rubikCube) => {
    let swap;
    for (let i = 0, j = 2; i < 3; i++, j--) {
      swap = rubikCube[face][0][i];
      temp[face][0][i] = rubikCube[face][2][j];
      temp[face][2][j] = swap;
    }
    swap = temp[face][1][2];
    temp[face][1][2] = temp[face][1][0];
    temp[face][1][0] = swap;
    return temp;
  };

  const startDoubleMove = (temp, faceCube, direction, rubikCube) => {
    for (let l = 0; l < faceCube.length; l++) {
      const des = faceCube[(l + 2) % faceCube.length].face;
      let { face, i, j, increase, one, two } = faceCube[l];
      for (let k = 0, m = 2; k < 3; k++, m--) {
        if (direction === "up" || direction === "down") {
          temp[des - 1][i][one > -1 ? one : k] =
            rubikCube[face - 1][j][two > -1 ? two : k];
        } else {
          temp[des - 1][i][one > -1 ? one : m] =
            rubikCube[face - 1][j][two > -1 ? two : k];
        }
        increase.indexOf("j+") > -1 && j++;
        increase.indexOf("j-") > -1 && j--;
        increase.indexOf("i+") > -1 && i++;
        increase.indexOf("i-") > -1 && i--;
      }
    }
    return temp;
  };

  const updateRubikCube = (rubikCube, option) => {
    let temp = rubikCube.map((face) =>
      face.map((row) => row.map((carre) => carre))
    );
    let faceCube;
    switch (option) {
      case "U":
        faceCube = [
          { face: 1, i: 0, j: 0, increase: "", one: -1, two: -1 },
          { face: 2, i: 0, j: 0, increase: "", one: -1, two: -1 },
          { face: 3, i: 0, j: 0, increase: "", one: -1, two: -1 },
          { face: 4, i: 0, j: 0, increase: "", one: -1, two: -1 },
        ];
        temp = moveFaceRight(temp, 4, rubikCube);
        temp = startSimpleMove(temp, faceCube, rubikCube);
        break;

      case "U'":
        faceCube = [
          { face: 1, i: 0, j: 0, increase: "", one: -1, two: -1 },
          { face: 4, i: 0, j: 0, increase: "", one: -1, two: -1 },
          { face: 3, i: 0, j: 0, increase: "", one: -1, two: -1 },
          { face: 2, i: 0, j: 0, increase: "", one: -1, two: -1 },
        ];
        temp = moveFaceLeft(temp, 4, rubikCube);
        temp = startSimpleMove(temp, faceCube, rubikCube);
        break;

      case "U2":
        faceCube = [
          { face: 1, i: 0, j: 0, increase: "", one: -1, two: -1 },
          { face: 2, i: 0, j: 0, increase: "", one: -1, two: -1 },
          { face: 3, i: 0, j: 0, increase: "", one: -1, two: -1 },
          { face: 4, i: 0, j: 0, increase: "", one: -1, two: -1 },
        ];
        temp = startDoubleMove(temp, faceCube, "up", rubikCube);
        temp = doubleMove(temp, 4, rubikCube);
        break;

      case "D":
        faceCube = [
          { face: 1, i: 2, j: 2, increase: "", one: -1, two: -1 },
          { face: 4, i: 2, j: 2, increase: "", one: -1, two: -1 },
          { face: 3, i: 2, j: 2, increase: "", one: -1, two: -1 },
          { face: 2, i: 2, j: 2, increase: "", one: -1, two: -1 },
        ];
        temp = startSimpleMove(temp, faceCube, rubikCube);
        temp = moveFaceRight(temp, 5, rubikCube);
        break;

      case "D'":
        faceCube = [
          { face: 1, i: 2, j: 2, increase: "", one: -1, two: -1 },
          { face: 2, i: 2, j: 2, increase: "", one: -1, two: -1 },
          { face: 3, i: 2, j: 2, increase: "", one: -1, two: -1 },
          { face: 4, i: 2, j: 2, increase: "", one: -1, two: -1 },
        ];
        temp = startSimpleMove(temp, faceCube, rubikCube);
        temp = moveFaceLeft(temp, 5, rubikCube);
        break;

      case "D2":
        faceCube = [
          { face: 1, i: 2, j: 2, increase: "", one: -1, two: -1 },
          { face: 4, i: 2, j: 2, increase: "", one: -1, two: -1 },
          { face: 3, i: 2, j: 2, increase: "", one: -1, two: -1 },
          { face: 2, i: 2, j: 2, increase: "", one: -1, two: -1 },
        ];
        temp = startDoubleMove(temp, faceCube, "down", rubikCube);
        temp = doubleMove(temp, 5, rubikCube);
        break;

      case "R":
        faceCube = [
          { face: 5, i: 2, j: 0, increase: ["i-", "j+"], one: 0, two: 2 },
          { face: 3, i: 0, j: 2, increase: ["i+", "j-"], one: 2, two: 0 },
          { face: 6, i: 0, j: 0, increase: ["i+", "j+"], one: 2, two: 2 },
          { face: 1, i: 0, j: 0, increase: ["i+", "j+"], one: 2, two: 2 },
        ];
        temp = moveFaceRight(temp, 3, rubikCube);
        temp = startSimpleMove(temp, faceCube, rubikCube);
        break;

      case "R'":
        faceCube = [
          { face: 5, i: 0, j: 0, increase: ["i+", "j+"], one: 2, two: 2 },
          { face: 1, i: 0, j: 0, increase: ["i+", "j+"], one: 2, two: 2 },
          { face: 6, i: 2, j: 0, increase: ["i-", "j+"], one: 0, two: 2 },
          { face: 3, i: 0, j: 2, increase: ["i+", "j-"], one: 2, two: 0 },
        ];
        temp = moveFaceLeft(temp, 3, rubikCube);
        temp = startSimpleMove(temp, faceCube, rubikCube);
        break;

      case "R2":
        faceCube = [
          { face: 5, i: 0, j: 0, increase: ["i+", "j+"], one: 2, two: 2 },
          { face: 3, i: 2, j: 0, increase: ["i-", "j+"], one: 2, two: 0 },
          { face: 6, i: 0, j: 0, increase: ["i+", "j+"], one: 2, two: 2 },
          { face: 1, i: 2, j: 0, increase: ["i-", "j+"], one: 0, two: 2 },
        ];
        temp = startDoubleMove(temp, faceCube, "left", rubikCube);
        temp = doubleMove(temp, 3, rubikCube);
        break;

      case "L":
        faceCube = [
          { face: 1, i: 0, j: 0, increase: ["i+", "j+"], one: 0, two: 0 },
          { face: 6, i: 2, j: 0, increase: ["i-", "j+"], one: 2, two: 0 },
          { face: 3, i: 0, j: 2, increase: ["i+", "j-"], one: 0, two: 2 },
          { face: 5, i: 0, j: 0, increase: ["i+", "j+"], one: 0, two: 0 },
        ];
        temp = startSimpleMove(temp, faceCube, rubikCube);
        temp = moveFaceRight(temp, 1, rubikCube);
        break;

      case "L'":
        faceCube = [
          { face: 5, i: 2, j: 0, increase: ["i-", "j+"], one: 2, two: 0 },
          { face: 3, i: 0, j: 2, increase: ["i+", "j-"], one: 0, two: 2 },
          { face: 6, i: 0, j: 0, increase: ["i+", "j+"], one: 0, two: 0 },
          { face: 1, i: 0, j: 0, increase: ["i+", "j+"], one: 0, two: 0 },
        ];
        temp = startSimpleMove(temp, faceCube, rubikCube);
        temp = moveFaceLeft(temp, 1, rubikCube);
        break;

      case "L2":
        faceCube = [
          { face: 1, i: 2, j: 0, increase: ["i-", "j+"], one: 2, two: 0 },
          { face: 5, i: 0, j: 0, increase: ["i+", "j+"], one: 0, two: 0 },
          { face: 3, i: 0, j: 2, increase: ["i+", "j-"], one: 0, two: 2 },
          { face: 6, i: 0, j: 0, increase: ["i+", "j+"], one: 0, two: 0 },
        ];
        temp = startDoubleMove(temp, faceCube, "", rubikCube);
        temp = doubleMove(temp, 1, rubikCube);
        break;

      case "F":
        faceCube = [
          { face: 5, i: 0, j: 2, increase: ["i+"], one: 0, two: -1 },
          { face: 4, i: 0, j: 2, increase: ["j-"], one: -1, two: 0 },
          { face: 6, i: 0, j: 0, increase: ["i+"], one: 2, two: -1 },
          { face: 2, i: 2, j: 2, increase: ["j-"], one: -1, two: 2 },
        ];
        temp = moveFaceRight(temp, 0, rubikCube);
        temp = startSimpleMove(temp, faceCube, rubikCube);
        break;

      case "F'":
        faceCube = [
          { face: 5, i: 2, j: 2, increase: ["i-"], one: 2, two: -1 },
          { face: 2, i: 0, j: 0, increase: ["j+"], one: -1, two: 2 },
          { face: 6, i: 2, j: 0, increase: ["i-"], one: 0, two: -1 },
          { face: 4, i: 2, j: 0, increase: ["j+"], one: -1, two: 0 },
        ];
        temp = moveFaceLeft(temp, 0, rubikCube);
        temp = startSimpleMove(temp, faceCube, rubikCube);
        break;

      case "F2":
        faceCube = [
          { face: 5, i: 0, j: 2, increase: [], one: -1, two: -1 },
          { face: 2, i: 2, j: 0, increase: ["i-", "j+"], one: 0, two: 2 },
          { face: 6, i: 2, j: 0, increase: [], one: -1, two: -1 },
          { face: 4, i: 0, j: 2, increase: ["i+", "j-"], one: 2, two: 0 },
        ];
        temp = startDoubleMove(temp, faceCube, "", rubikCube);
        temp = doubleMove(temp, 0, rubikCube);
        break;

      case "B":
        faceCube = [
          { face: 5, i: 2, j: 0, increase: ["i-"], one: 0, two: -1 },
          { face: 2, i: 2, j: 0, increase: ["j+"], one: -1, two: 0 },
          { face: 6, i: 2, j: 2, increase: ["i-"], one: 2, two: -1 },
          { face: 4, i: 0, j: 0, increase: ["j+"], one: -1, two: 2 },
        ];
        temp = startSimpleMove(temp, faceCube, rubikCube);
        temp = moveFaceRight(temp, 2, rubikCube);
        break;

      case "B'":
        faceCube = [
          { face: 5, i: 0, j: 0, increase: ["i+"], one: 2, two: -1 },
          { face: 4, i: 2, j: 2, increase: ["j-"], one: -1, two: 2 },
          { face: 6, i: 0, j: 2, increase: ["i+"], one: 0, two: -1 },
          { face: 2, i: 0, j: 2, increase: ["j-"], one: -1, two: 0 },
        ];
        temp = moveFaceLeft(temp, 2, rubikCube);
        temp = startSimpleMove(temp, faceCube, rubikCube);
        break;

      case "B2":
        faceCube = [
          { face: 5, i: 2, j: 0, increase: [], one: -1, two: -1 },
          { face: 2, i: 2, j: 0, increase: ["i-", "j+"], one: 2, two: 0 },
          { face: 6, i: 0, j: 2, increase: [], one: -1, two: -1 },
          { face: 4, i: 2, j: 0, increase: ["i-", "j+"], one: 0, two: 2 },
        ];
        temp = startDoubleMove(temp, faceCube, "", rubikCube);
        temp = doubleMove(temp, 2, rubikCube);
        break;

      default:
        break;
    }
    return temp;
  };

  return [updateRubikCube];
};
