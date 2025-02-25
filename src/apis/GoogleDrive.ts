import axios from 'axios'
import RNFS from 'react-native-fs'

const uploadToDrive = async (accessToken: string, filePath: string) => {
    try {
        const fileName = 'd-task-data.json'
        const fileId = await getFileId(accessToken)
        const fileContent = await RNFS.readFile(filePath, 'utf8')

        const metadata = { name: fileName, mimeType: 'application/json' }
        const boundary = 'foo_bar_baz'

        let body = `--${boundary}\r\n`
        body += 'Content-Type: application/json; charset=UTF-8\r\n\r\n'
        body += JSON.stringify(metadata) + '\r\n'
        body += `--${boundary}\r\n`
        body += 'Content-Type: application/json\r\n\r\n'
        body += fileContent + '\r\n'
        body += `--${boundary}--\r\n`

        let url = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart'
        let method = 'POST'

        if (fileId) {
            url = `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=multipart`
            method = 'PATCH'
            console.log('Updating existing file...')
        } else {
            console.log('Uploading new file...')
        }

        const response = await axios({
            method,
            url,
            data: body,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': `multipart/related; boundary=${boundary}`,
            },
        })

        return response.data

    } catch (error) {
        console.error('Upload Error:', error)
        if (axios.isAxiosError(error)) {
            console.error('Axios Error Data:', error.response?.data)
            console.error('Axios Error Status:', error.response?.status)
            console.error('Axios Error Headers:', error.response?.headers)
        }
        throw error
    }
}

const getFileId = async (accessToken: string) => {
    try {
        const response = await axios.get(
            "https://www.googleapis.com/drive/v3/files",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    q: "name='d-task-data.json' and trashed=false",
                    fields: "files(id, name)",
                },
            }
        )

        if (response.data.files.length > 0) {
            return response.data.files[0].id
        } else {
            return null
        }
    } catch (error) {
        console.error("❌ Error getting fileId:", error)
        return null
    }
}

const downloadFile = async (accessToken: string, fileId: string) => {
    const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) throw new Error("Lỗi khi tải file")

        const textData = await response.text()
        return JSON.parse(textData)
    } catch (error) {
        console.error("❌ Lỗi khi tải dữ liệu từ Google Drive:", error)
        return null;
    }
};

export const GoogleDrive = {
    uploadToDrive, getFileId, downloadFile
}