import React, { useState, useCallback } from 'react';
import './style.css';

//đề show 1 tree package

// data type tree

// loop đệ quy => per

const dataInitial = [
  {
    key2: 'src',
    fileName: 'src',
    isPackage: true,
    statusNode: 1,
    childFolders: [
      {
        key2: 'src/test',
        fileName: 'test',
        statusNode: 0,
        isPackage: true,
        childFolders: [
          {
            key2: 'src/test/a.js',
            fileName: 'a.js',
            isPackage: false,
            childFolders: undefined,
          },
        ],
      },
      {
        key2: 'src/App.js',
        fileName: 'App.js',
        isPackage: false,
        statusNode: 1,
        childFolders: undefined,
      },
      {
        key2: 'src/index.js',
        fileName: 'index.js',
        isPackage: false,
        statusNode: 1,
        childFolders: undefined,
      },
      {
        key2: 'src/style.css',
        fileName: 'style.css',
        isPackage: false,
        statusNode: 1,
        childFolders: undefined,
      },
    ],
  },
];

function updateStateFolder(dataInitial, paths, newObject) {
  function updateFolderStateRecursive(folder, currentPathIndex) {
    if (currentPathIndex >= paths.length) {
      return { ...folder, ...newObject };
    } else {
      if (folder.childFolders) {
        return {
          ...folder,
          childFolders: folder.childFolders.map((subFolder) => {
            if (subFolder.fileName === paths[currentPathIndex]) {
              return updateFolderStateRecursive(
                subFolder,
                currentPathIndex + 1
              );
            }
            return subFolder;
          }),
        };
      }
    }
    return folder;
  }

  let updatedData = [...dataInitial];

  updatedData = updatedData.map((folder) => {
    if (folder.fileName === paths[0]) {
      return updateFolderStateRecursive(folder, 1);
    }
    return folder;
  });

  return updatedData;
}

function NodeTree(props) {
  const {
    key2,
    fileName,
    statusNode,
    isPackage,
    childFolders,
    handleOpenFolder,
  } = props;

  const isOpenFile = statusNode === 1;
  const wrapHandleOpen = () => {
    handleOpenFolder(key2, statusNode);
  };
  return (
    <div key={fileName}>
      <ul style={{ listStyleType: 'none' }}>
        <li>
          <a onClick={wrapHandleOpen}>
            {isPackage && (isOpenFile ? ' < ' : ' > ')} {fileName}
          </a>
          <div>
            {isOpenFile &&
              childFolders !== undefined &&
              childFolders.map((child, index) => {
                const props = { ...child, handleOpenFolder };
                return <NodeTree {...props} />;
              })}
          </div>
        </li>
      </ul>
    </div>
  );
}

export default function App() {
  const [dataList, setDataList] = useState(dataInitial);
  // src/test

  const handleOpenFolder = (key, statusNode) => {
    const paths = key.split('/');
    const newState = updateStateFolder(dataInitial, paths, { statusNode: 1 });

    setDataList(newState);
  };

  if (dataList === undefined) {
    return <></>;
  }

  return (
    <div>
      <h2>Package Tree</h2>
      {dataList.map((todo, index) => {
        const props = { ...todo, handleOpenFolder };
        return <NodeTree {...props} />;
      })}
    </div>
  );
}
